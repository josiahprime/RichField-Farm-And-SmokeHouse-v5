import Order from "../models/order.model.js";
import crypto from "crypto";
import {generateTrackingID} from '../lib/trackingId.js'
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import https from 'https'
import User from "../models/user.model.js";


const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
if (!PAYSTACK_SECRET_KEY) {
  throw new Error("PAYSTACK_SECRET_KEY is not set in environment variables.");
}



export const paystackInitialize = async (req, res) => {
  console.log('paystack payment called');
  const { name, email, phone, address, amount, items } = req.body;
  console.log(req.body)
  // Ensure user exists before linking to order
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  

  try {
    // Generate unique transaction reference
    const tx_ref = `TX-${Date.now()}`;
    const trackingId = `TRK-${Math.random().toString(36).substring(2, 15)}`;

    // Save order BEFORE payment
    const order = new Order({ 
      userId: user._id,  // Link userId to User model
      tx_ref, 
      trackingId, 
      name, 
      email, 
      phone, 
      address, 
      amount, 
      items,
      status: "pending" 
    });
    await order.save();

    const params = JSON.stringify({
      email,
      amount: amount, // Convert to kobo (subunit of NGN)
      reference: tx_ref,
      callback_url: "http://localhost:5173/payment-success"
    });

    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: "/transaction/initialize",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json"
      }
    };

    const paystackReq = https.request(options, (paystackRes) => {
      let data = "";

      paystackRes.on("data", (chunk) => {
        data += chunk;
      });

      paystackRes.on("end", () => {
        const response = JSON.parse(data);
        res.json(response);
      });
    });

    paystackReq.on("error", (error) => {
      console.error(error);
      res.status(500).json({ error: "Payment initialization failed" });
    });

    paystackReq.write(params);
    paystackReq.end();
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Failed to save order" });
  }
};




export const verifyPayment = async (req, res) => {
  console.log("📢 We reached verify payment");
  const { reference } = req.params;

  try {
    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: `/transaction/verify/${reference}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json"
      }
    };

    https.get(options, async (paystackRes) => {
      let data = "";

      paystackRes.on("data", (chunk) => {
        data += chunk;
      });

      paystackRes.on("end", async () => {
        try {
          const response = JSON.parse(data);
          console.log("💰 Paystack Response:", response);

          if (response.status && response.data.status === "success") {
            // ✅ Update order status to "success"
            await Order.findOneAndUpdate(
              { tx_ref: reference }, 
              { status: "success" }
            );

            res.json({
              status: "success",
              message: "Payment verified successfully!",
              data: response.data
            });
          } else {
            // ❌ Update order status to "failed"
            await Order.findOneAndUpdate(
              { tx_ref: reference }, 
              { status: "failed" }
            );

            res.status(400).json({
              status: "error",
              message: "Payment verification failed.",
              data: response.data
            });
          }
        } catch (error) {
          console.error("❌ JSON Parse Error:", error);
          res.status(500).json({ error: "Invalid response from Paystack" });
        }
      });
    }).on("error", (error) => {
      console.error("❌ Paystack API Error:", error);
      res.status(500).json({ error: "Verification failed", details: error.message });
    });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};




export const pay = async (req, res) => {
  console.log('we reached payment route')
  const { name, email, phone, address, amount } = req.body;
  const tx_ref = uuidv4(); // Unique transaction reference
  const trackingId = generateTrackingID(); // Assign Tracking ID

  try {
    // Save order BEFORE payment
    const order = new Order({ 
      tx_ref, 
      trackingId, 
      name, 
      email, 
      phone, 
      address, 
      amount, 
      status: "pending" 
    });
    await order.save();

    // Initialize payment with Paystack
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount, // Convert to kobo
        reference: tx_ref,
        callback_url: `http://localhost:5173/payment-status?tx_ref=${tx_ref}`,
      },
      { headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` } }
    );

    if (response.data && response.data.status) {
      res.json(response.data);
    } else {
      throw new Error("Failed to initialize payment");
    }
  } catch (error) {
    console.error("Payment Initialization Error:", error);
    res.status(500).json({ error: "Payment initialization failed" });
  }
};



export const webhook = async (req, res) => {
  console.log('webhook called')
  const payload = req.body;
  console.log("🔔 Paystack Webhook Data:", JSON.stringify(payload, null, 2));

  if (!payload || !payload.event || !payload.data) {
    return res.status(400).json({ message: "Invalid webhook data" });
  }

  const paystackSignature = req.headers["x-paystack-signature"]?.toLowerCase();

  if (!paystackSignature) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Verify Paystack signature
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(payload))
    .digest("hex");

  if (hash !== paystackSignature) {
    return res.status(400).json({ message: "Invalid signature" });
  }

  try {
    const { reference, status } = payload.data;
    const paymentStatus = status === "success" ? "paid" : "failed";

    // Find the order by reference
    const order = await Order.findOne({ tx_ref: reference });

    if (!order) {
      console.warn(`⚠ Order with reference ${reference} not found`);
      return res.sendStatus(200); // Prevent webhook retries
    }

    if (paymentStatus === "paid") {
      order.trackingId = order.trackingId || generateTrackingID();
    }

    order.status = paymentStatus;
    await order.save();

    console.log(`✅ Order ${reference} updated to ${paymentStatus} with Tracking ID: ${order.trackingId}`);

    res.sendStatus(200);
  } catch (error) {
    console.error("❌ Error processing webhook:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




export const getOrderStatus = async (req, res) => {
  const { tx_ref } = req.query;

  try {
    const order = await Order.findOne({ tx_ref });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ status: order.status, trackingId: order.trackingId });
  } catch (error) {
    console.error("Error fetching order status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
