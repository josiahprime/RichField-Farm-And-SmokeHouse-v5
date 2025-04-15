import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/dashboardLayout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OrderTable from "./OrderTable";
import OrderDetails from "./OrderDetails";

const DeliveryPage = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filters, setFilters] = useState({ status: "", search: "", dateRange: null });

  useEffect(() => {
    axios.get("/mockOrders.json")
      .then((response) => {
        console.log("Fetched orders:", response.data);
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <DashboardLayout>
      <div>
        {/* Header Section */}
        <h1 className="text-2xl font-bold">Delivery Page</h1>
        <p className="text-gray-600">Track and manage your orders easily.</p>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders Overview */}
          <div className={`bg-white p-6 rounded-lg shadow ${selectedOrder ? "lg:col-span-2" : "lg:col-span-3"}`}>
            <OrderTable orders={orders} filters={filters} setFilters={setFilters} />
          </div>

          {/* Order Details */}
          {selectedOrder && (
            <div className="bg-white p-6 rounded-lg shadow lg:col-span-1">
              <OrderDetails order={selectedOrder} />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DeliveryPage;
