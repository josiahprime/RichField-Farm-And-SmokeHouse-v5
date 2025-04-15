import React, { useState, useEffect } from "react";
import useCartStore from "../../../store/useCartStore";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ProductInfo = ({ productInfo }) => {
  const [selectedImage, setSelectedImage] = useState(productInfo.images[0]);
  const [index, setIndex] = useState(0);
  const addToCart = useCartStore((state) => state.addToCart);
  const [value, setValue] = useState(1);

  // Function to handle adding item to the cart
  const handleAddToCart = () => {
    addToCart({
      id: productInfo.id,
      name: productInfo.name,
      description: productInfo.description,
      image: productInfo.images[0],
      priceInKobo:productInfo.priceInKobo,
      quantity: value,
    });
    // Show a toast notification
    toast.success(`${name} added to cart!`, {
      position: 'top-right',
      duration: 3000,
    });
  };

  // Auto-slide logic (Infinite loop)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % productInfo.images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [productInfo.images]);

  useEffect(() => {
    setSelectedImage(productInfo.images[index]);
  }, [index, productInfo.images]);

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Images */}
        <div>
          <motion.img
            key={selectedImage}
            src={selectedImage}
            alt="Product"
            className="w-full h-80 object-cover rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          {/* Image Thumbnails */}
          <div className="flex mt-4 gap-2">
            {productInfo.images.map((img, i) => (
              <motion.img
                key={i}
                src={img}
                alt="Thumbnail"
                className={`w-16 h-16 object-cover rounded cursor-pointer border-2 
                  ${selectedImage === img ? "border-orange-500" : "border-transparent"}
                `}
                onClick={() => {
                  setSelectedImage(img);
                  setIndex(i);
                }}
                whileHover={{ scale: 1.1 }}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-semibold">{productInfo.name}</h1>
          <p className="text-orange-500 font-bold text-lg">
            {productInfo.rating} ⭐ ({productInfo.reviewsCount})
          </p>
          <p className="text-gray-600 mt-2">{productInfo.description}</p>
          <div className="text-2xl font-bold mt-4">
            ${productInfo.priceInKobo}{" "}
            <span className="line-through text-gray-400">
              ${productInfo.originalPrice}
            </span>
          </div>
          <div className="mt-4">
            <span className="font-medium">Brand:</span> {productInfo.brand} <br />
            <span className="font-medium">Color:</span> {productInfo.color} <br />
            <span className="font-medium">Category:</span> {productInfo.category}
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
            onClick={handleAddToCart}
            >
            
              Add to Cart
            </button>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
