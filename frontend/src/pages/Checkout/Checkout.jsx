import { useState, useEffect } from "react";
import useCheckoutStore from "../../store/useCheckoutStore";
import useCartStore from "../../store/useCartStore";
import { toast } from "react-hot-toast";
import { formatPrice } from "../../Components/Utils/FormatCurrency";

const Checkout = () => {
  const { items } = useCartStore();
  const { setAmount, setItems, amount, isPaying, handlePaystackPayment } = useCheckoutStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => console.log("Paystack SDK Loaded");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const totalAmount = items.reduce((total, item) => total + item.priceInKobo * item.quantity, 0);
    setAmount(totalAmount);
    setItems(items);  // ✅ Store items in Zustand
  }, [items, setAmount, setItems]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, address, postalCode } = formData;

    if (!email || !name || !phone || !address || !postalCode) {
      toast.error("Please fill out all fields");
      return;
    }
    
    if (!window.PaystackPop) {
      toast.error("Paystack SDK not loaded. Please refresh and try again.");
      return;
    }

    handlePaystackPayment(name, email, phone, address, amount, items);  // ✅ Send items in API call
  };

  return (
    <div className="mx-5 lg:mx-24 my-12 font-[sans-serif] bg-white">
      <div className="max-lg:max-w-xl mx-auto w-full">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 max-lg:order-1 p-6 !pr-0 max-w-4xl mx-auto w-full border rounded-md">
            <form className="lg:mt-10" onSubmit={handleSubmit}>
              <h2 className="text-xl font-bold text-gray-800">Shipping Information</h2>
              <div className="grid sm:grid-cols-2 gap-8 mt-8">
                {["name", "email", "phone", "address", "postalCode"].map((field) => (
                  <input
                    key={field}
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    placeholder={field.replace(/([A-Z])/g, " $1")}
                    className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-green-500 outline-none"
                    value={formData[field]}
                    onChange={handleChange}
                  />
                ))}
              </div>
              <button
                type="submit"
                className="min-w-[150px] px-6 py-3.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 mt-8"
                disabled={isPaying}
              >
                {isPaying ? "Processing..." : `Confirm payment ₦${formatPrice(amount)}`}
              </button>
            </form>
          </div>

          <div className="bg-green-100 lg:h-screen lg:sticky lg:top-0 lg:max-w-[430px] w-full lg:ml-auto">
            <div className="relative h-full p-6 overflow-auto max-lg:max-h-[450px] lg:h-[calc(100vh-50px)]">
              <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
              {items.map((item) => (
                <div className="space-y-7 mt-8" key={item.id}>
                  <div className="flex gap-4">
                    <div className="w-[120px] h-[120px] flex items-center justify-center p-3 shrink-0 bg-white border rounded-lg">
                      <img src={item.image} className="w-full object-contain" alt={item.name} />
                    </div>
                    <div className="w-full">
                      <h3 className="text-sm text-gray-800 font-bold">{item.name}</h3>
                      <ul className="text-xs text-gray-800 space-y-1 mt-2">
                        <li>Quantity <span className="float-right">{item.quantity}</span></li>
                        <li>Total Price <span className="float-right">₦{formatPrice(item.priceInKobo)}</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
              <div className="lg:absolute lg:left-0 lg:bottom-0 bg-green-200 w-full p-4">
                <h4 className="flex flex-wrap gap-4 text-gray-800 font-bold">Total <span className="ml-auto">₦{formatPrice(amount)}</span></h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default Checkout;
