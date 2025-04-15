import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../../components/ProductsCard/products.json"; // Assuming your products data is here

const EditProduct = () => {
  const { id } = useParams(); // Get product ID from the route
  const navigate = useNavigate();

  // Find the product with the matching ID
  const product = products.find((item) => item.id === parseInt(id));

  // State for the editable fields
  const [formData, setFormData] = useState({
    title: product?.title || "",
    price: product?.price || 0,
    description: product?.description || "",
    stock: product?.stock || 0,
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated product data:", formData);

    // Here you can send the updated data to an API or update your local state
    navigate("/dashboard/products"); // Redirect back to the products page
  };

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold mb-2">Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block font-semibold mb-2">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
