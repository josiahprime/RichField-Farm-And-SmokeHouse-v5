const ProductCard = ({ id, imageUrl, title, price, description, stock, onEdit }) => {
  return (
    <div className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 p-2">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-lg" />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-green-600 font-bold text-lg">${price}</p>
        <p className="text-gray-500 text-sm">Stock: {stock}</p>
        <p className={`text-sm ${stock > 0 ? "text-green-600" : "text-red-600"}`}>
          {stock > 0 ? "In Stock" : "Out of Stock"}
        </p>
        <p className="text-gray-600 text-sm">{description}</p>
        <div className="flex items-center justify-end mt-4 space-x-4">
          {/* Edit Button */}
          <button onClick={() => onEdit(id)} className="hover:text-green-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#16a34a"
            >
              <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
            </svg>
          </button>
           {/* Delete Button */}
           <button className="hover:text-red-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#dc2626"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard