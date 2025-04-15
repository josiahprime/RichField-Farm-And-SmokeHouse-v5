import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const deliveryDetails = () => {
  const [orders, setOrders] = useState([]); // All orders
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Get order ID from the route
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/mockOrders.json")
      .then((response) => {
        console.log("Pull successful");
        console.log("Fetched orders:", response.data);
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error.message);
        setLoading(false);
      });
  }, []);

  const order = orders.find((item) => item.id === id); // Find the order with the matching ID

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-semibold text-red-500">Order Not Found</h1>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-6 w-full">
        <Navbar />
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="bg-white rounded-lg shadow p-6">
            {/* Header */}
            <div className="mb-6 border-b pb-4">
              <h1 className="text-3xl font-bold text-gray-800">
                Order Details - #{order.id}
              </h1>
              <p className="text-gray-600">
                View detailed information about this order.
              </p>
            </div>

            {/* Delivery Timeline */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Delivery Timeline
              </h2>
              <ul className="space-y-4">
                {order.timeline.map((event, index) => (
                  <li key={index} className="flex items-start">
                    <span className="h-4 w-4 mt-1 bg-green-500 rounded-full"></span>
                    <div className="ml-4">
                      <p className="text-lg font-medium">{event.title}</p>
                      <p className="text-sm text-gray-500">{event.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Order Summary */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Order Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded shadow">
                  <p className="font-medium text-gray-700">Product Name:</p>
                  <p className="text-gray-600">{order.productName}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded shadow">
                  <p className="font-medium text-gray-700">Status:</p>
                  <p className={`font-bold ${order.status === "Delivered" ? "text-green-600" : "text-yellow-600"}`}>
                    {order.status}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded shadow">
                  <p className="font-medium text-gray-700">Amount:</p>
                  <p className="text-gray-600">${order.amount.toFixed(2)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded shadow">
                  <p className="font-medium text-gray-700">Ordered Date:</p>
                  <p className="text-gray-600">{order.orderedDate}</p>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div className="flex justify-end">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
              >
                Back to Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default deliveryDetails;
