import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const useCheckoutStore = create((set) => ({
  isPaying: false,
  amount: 0,
  email: "",
  phone: "",
  name: "",
  items: [],  // ✅ Added items to track purchases
  status: "loading",
  message: "",

  setAmount: (amount) => set({ amount }),
  setItems: (items) => set({ items }),  // ✅ New function to set items

  handlePaystackPayment: async (name, email, phone, address, amount, items) => {
    set({ isPaying: true });
    
    try {
      const response = await axiosInstance.post("/pay/paystack/initiate", {
        name,
        email,
        phone,
        address,
        amount,
        items,  // ✅ Send items to backend
      });

      const { authorization_url } = response.data.data;
      if (!authorization_url) {
        console.error("Authorization URL not received");
        toast.error("Error initiating payment");
        return;
      }

      window.location.href = authorization_url;
    } catch (error) {
      console.error("Error initializing payment:", error);
      toast.error("Payment Failed");
    } finally {
      set({ isPaying: false });
    }
  },

  verifyPayment: async (reference) => {
    try {
      const response = await axiosInstance.get(`/pay/paystack/verify/${reference}`);
      
      if (response.data.status === "success") {
        toast.success("Payment Successful");
        set({
          status: "success",
          message: "Payment verified successfully!",
        });
        history.replaceState(null, "", "/product");

      } else {
        set({
          status: "error",
          message: "Payment verification failed.",
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error verifying payment. Please try again.";
      toast.error(errorMessage);
      set({
        status: "error",
        message: errorMessage,
      });
    }
  },
}));

export default useCheckoutStore;
