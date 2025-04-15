import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineClose, AiOutlineUpload, AiOutlineMinus } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import DashboardLayout from "../../components/dashboardLayout/DashboardLayout";

const ProductsForm = () => {
  const [tags, setTags] = useState(["Meat", "Organic", "Fresh"]);
  const [newTag, setNewTag] = useState("");
  const [stock, setStock] = useState(1);
  const [selectedImages, setSelectedImages] = useState([]);
  console.log(stock)

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    category: "",
    subCategory: "",
    price: "",
    stock: stock
  });

  console.log(formData)
  const handleChange = (event) => {
    
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Updates the correct field dynamically
    }));
  };
  

  const handleAddTag = () => {
    if (newTag.trim() !== "") {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e) => {
    console.log("File input change detected:", e.target.files);
    const files = Array.from(e.target.files);
  
    if (files.length === 0) {
      console.log("No files selected.");
      return;
    }
  
    const imageUrls = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));
  
    // Append new images while keeping previous ones, limiting to 3
    setSelectedImages((prev) => [...prev, ...imageUrls].slice(0, 3));
  };
  
  
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).slice(0, 3);
  
    const imageUrls = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));
  
    // Replace previous images instead of appending
    setSelectedImages(imageUrls);
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };
  
  
  

  return (
    <DashboardLayout>
      <div className="flex min-h-screen bg-gray-100 p-6">
        <div className="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BsBoxSeam className="text-blue-600" /> Add New Product
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            {/* Form Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name *</label>
                <input 
                type="text" placeholder="Enter product name"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="w-full border rounded-md p-2 text-sm" />
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <textarea 
                placeholder="Enter product description" 
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-md p-2 text-sm h-24" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category *</label>
                  <input 
                  type="text" 
                  placeholder="Enter category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Sub Category *</label>
                  <input 
                  type="text" 
                  placeholder="Enter sub category" 
                  name="sub-category"
                  value={formData.subCategory}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-10">
                <div>
                  <label className="block text-sm font-medium mb-1">Price In Naira *</label>
                  <input 
                  type="text"
                  placeholder="Enter price in naira"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 text-sm" />
                </div>

                {/* Stock Management */}
                <div>
                  <label className="block text-sm font-medium mb-1">Stock</label>
                  <div className="flex items-center space-x-3">
                    <button 
                      className="bg-gray-300 text-gray-700 p-2 rounded-full"
                      onClick={() => setStock(stock > 0 ? stock - 1 : 0)}
                    >
                      <AiOutlineMinus />
                    </button>
                    <input 
                      type="number" 
                      value={stock} 
                      onChange={(e) => setStock(parseInt(e.target.value) || 0)}
                      className="w-20 text-center border rounded-md p-2 text-sm"
                    />
                    <button 
                      className="bg-gray-300 text-gray-700 p-2 rounded-full"
                      onClick={() => setStock(stock + 1)}
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium mb-1">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center">
                      {tag}
                      <AiOutlineClose className="ml-2 text-red-500 cursor-pointer" onClick={() => handleRemoveTag(index)} />
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input 
                    type="text" 
                    value={newTag} 
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag..." 
                    className="border rounded-md p-2 text-sm flex-1"
                  />
                  <button onClick={handleAddTag} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                    <AiOutlinePlus />
                  </button>
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-6">
              <div 
                className="border rounded-lg p-4 text-center cursor-pointer relative"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  id="fileUpload"
                  multiple
                  onChange={handleImageUpload} 
                />
                <label htmlFor="fileUpload" className="block cursor-pointer">
                  <AiOutlineUpload className="text-4xl text-gray-400 mx-auto" />
                  <p className="mt-2 text-sm">Click or drag up to 3 images</p>
                </label>

                {/* Image Preview Grid */}
                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img src={image.url} alt="Uploaded" className="w-full h-24 object-cover rounded-lg" />
                        <button 
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <AiOutlineClose />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-8">
            <button className="bg-green-600 text-white px-6 py-3 rounded-md flex items-center gap-2 text-lg font-medium">
              Save Product
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProductsForm;
