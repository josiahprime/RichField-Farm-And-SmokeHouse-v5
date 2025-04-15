import React from "react";
import  { useNavigate, Link } from "react-router-dom";
import ProductCard from "../../components/ProductsCard/ProductsCard";
import products from "../../components/ProductsCard/products.json";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DashboardLayout from "../../components/dashboardLayout/DashboardLayout";

const Products = () => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/dashboard/products/edit/${id}`);
  };

  return (
    <DashboardLayout>
      <div className="flex">
        <div className="flex-6 w-screen">
          <div className="text-gray-600 font-bold m-4">
            <h1
              className="shadow-md border-solid border-gray-300 duration-300
            text-center py-6 px-4 rounded-2xl bg-white/40 hover:bg-white text-xl"
            >
              Available Products
            </h1>
            <Link to="/dashboard/products/addProducts">
              <button
                className="shadow-md border-solid border-gray-300 duration-300 text-center cursor-pointer text-xl py-6 px-4 rounded-2xl bg-white/40 hover:text-gray-900"
              >
                Add new products
              </button>
            </Link>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                title={item.title}
                price={item.price}
                stock={item.stock}
                description={item.description}
                onEdit={handleEdit}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Products;
