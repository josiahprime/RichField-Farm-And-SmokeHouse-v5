import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  tx_ref: { type: String, unique: true, required: true }, // Flutterwave transaction reference
  trackingId: { type: String, unique: true, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{ name: String, quantity: Number, price: Number }],
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  address: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});




const Order = mongoose.model("Order", OrderSchema);


export default Order;



