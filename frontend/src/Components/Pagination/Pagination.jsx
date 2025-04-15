import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import ProductCard from '../../pages/Product/ProductCard'


const PaginatedProducts = ({ products, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate the displayed items for the current page
  const offset = currentPage * itemsPerPage;
  const currentItems = products.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  // Handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      {/* Product List */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-8 md:gap-3 lg:px-0 mb-0">
          {currentItems.map((product) => (
            console.log(product.images[0]),
            <ProductCard
              key={product.id}
              name={product.name}
              description={product.description}
              id={product.id}
              image={product.images[0]}
              rating={product.rating}
              priceInKobo={product.priceInKobo}
            />
          ))}
        </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6">
        <ReactPaginate
            previousLabel="« Prev"
            nextLabel="Next »"
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName="flex space-x-3 text-base font-medium"
            activeClassName="bg-gray-800 text-white border-gray-800"
            pageClassName="px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-200 transition"
            previousClassName="px-4 py-2 border border-gray-500 rounded-md hover:bg-gray-300 transition"
            nextClassName="px-4 py-2 border border-gray-500 rounded-md hover:bg-gray-300 transition"
            disabledClassName="opacity-50 cursor-not-allowed"
        />
        </div>

    </div>
  );
};

export default PaginatedProducts;
