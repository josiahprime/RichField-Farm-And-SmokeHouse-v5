import { MdShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';

const CartIcon = () => {
  return (
    <Link to="/cart" className="relative text-2xl text-gray-700 dark:text-gray-300">
      <MdShoppingCart />
      {/* Add a badge if you want */}
      {/* <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">2</span> */}
    </Link>
  );
};

export default CartIcon;
