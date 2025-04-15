import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";
import products from "../../../data/products.json"; // Import product data

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from the URL
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState(null);
  console.log('id', id)
  console.log(products)
  useEffect(() => {
    // Find product by ID
    const foundProduct = products.find((p) => p.id.toString() === id);
    console.log(foundProduct)

    if (foundProduct) {
      setProductInfo(foundProduct);
    }

    setPrevLocation(`/product/${id}`);
  }, [id]);

  if (!productInfo) {
    return <h1 className="text-center text-2xl font-bold mt-10">Product Not Found</h1>;
  }

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="flex">
        <div className="h-full">
          <ProductsOnSale />
        </div>
        <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
          <ProductInfo productInfo={productInfo} />
        </div>
      </div>
      
    </div>
  );
};

export default ProductDetails;
