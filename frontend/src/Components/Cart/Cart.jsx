import { Link } from "react-router-dom";
import useCartStore from "../../store/useCartStore";
import { formatPrice } from "../Utils/FormatCurrency";

const Cart = () => {
  // Retrieve cart state and actions from Zustand
  const cartItems = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);

  console.log(cartItems);

  // Calculate total price
  const total = cartItems.reduce(
    (sum, item) => sum + item.priceInKobo * item.quantity,
    0
  );

  return (
    <div className="bg-white py-12">
      <div className="max-w-6xl mx-auto p-6 text-slate-600">
        {cartItems.length === 0 ? (
          <div className="grid place-content-center bg-white px-4">
            <div className="text-center">
              <h1 className="text-9xl font-black text-gray-300 mb-10">Ops!</h1>
              <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                No item in the cart
              </p>
              <Link
                to="/"
                className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
              >
                Add Product
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Table for larger screens */}
            <div className="hidden md:block">
              <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 border border-gray-300">S.N.</th>
                    <th className="p-3 border text-left border-gray-300">Image</th>
                    <th className="p-3 border border-gray-300 text-left">Product</th>
                    <th className="p-3 border border-gray-300">Unit Price</th>
                    <th className="p-3 border border-gray-300">Quantity</th>
                    <th className="p-3 border border-gray-300">Total Price</th>
                    <th className="p-3 border border-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={item.id}>
                      <td className="p-3 border border-gray-300 text-center">{index + 1}</td>
                      <td className="p-3 border border-gray-300 text-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="p-3 border border-gray-300">{item.name}</td>
                      <td className="p-3 border border-gray-300 text-center">
                        ₦{formatPrice(item.priceInKobo)}
                      </td>
                      <td className="border border-gray-300 text-center">
                        <div className="border rounded-full p-2 w-44 mx-auto">
                          <button
                            className="w-10 py-1 text-white bg-teal-900 rounded-md hover:bg-teal-950"
                            onClick={() => decrementQuantity(item.id)}
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            className="w-10 py-1 text-white bg-teal-900 rounded-md hover:bg-teal-950"
                            onClick={() => incrementQuantity(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-3 border border-gray-300 text-center">
                        ₦{formatPrice(item.priceInKobo * item.quantity)}
                      </td>
                      <td className="p-3 border border-gray-300 text-center">
                        <button
                          className="text-slate-700 text-2xl"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards for mobile view */}
            <div className="md:hidden space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center gap-4 border border-gray-300 p-4 rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-bold">{item.name}</h2>
                    <p>Unit Price: ₦{formatPrice(item.priceInKobo)}</p>
                    <p>Total: ₦{formatPrice(item.priceInKobo * item.quantity)}</p>
                    <div className="flex items-center mt-2">
                      <button
                        className="px-2 text-white bg-green-500 rounded"
                        onClick={() => decrementQuantity(item.id)}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="px-2 text-white bg-orange-500 rounded"
                        onClick={() => incrementQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="px-3 py-1 text-white bg-red-600 rounded"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              ))}
            </div>

            {/* Footer actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
              <button
                className="px-6 py-2 bg-red-600 text-white rounded shadow w-full sm:w-auto"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <div className="flex items-center text-base font-bold text-green-600">
                Quantity ({cartItems.length} Items):
                <div className="mx-3 text-xl">₦ {formatPrice(total)}</div>
              </div>
              <Link
                to="checkout"
                className="px-8 py-3 bg-green-600 text-white rounded shadow w-full sm:w-auto"
              >
                Check Out
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
