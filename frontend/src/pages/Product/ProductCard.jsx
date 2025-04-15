import PropTypes from 'prop-types';
import { useState } from 'react';
import useCartStore from '../../store/useCartStore';
import { formatPrice } from '../../Components/Utils/FormatCurrency';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { AiFillStar, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { motion } from 'framer-motion';

function ProductCard({
  name = 'Product',
  description = 'Lorem ipsum dolor sit amet',
  id = '0000',
  image = '/src/assets/no_image.png',
  priceInKobo = 4000,
  rating = 4.5,
}) {
  const addToCart = useCartStore((state) => state.addToCart);
  const formattedPrice = formatPrice(priceInKobo);
  const [isFavourite, setIsFavourite] = useState(false);
  const [cartClicked, setCartClicked] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent Link navigation
    setCartClicked(true);
    addToCart({ id, name, description, image, priceInKobo, quantity: 1 });
    toast.success(`${name} added to cart!`);
    setTimeout(() => setCartClicked(false), 300); // Reset animation
  };

  const handleFavouriteToggle = (e) => {
    e.preventDefault();
    setIsFavourite((prev) => !prev);
  };

  return (
    <Link to={`/product/${id}`} className="block w-[240px] shrink-0 group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col relative">
        <div className="relative">
          <img src={image} alt={name} className="w-full h-40 object-cover" />

          {/* SALE or NEW tag */}
          <span className={`absolute bottom-2 right-2 text-white text-xs font-bold px-2 py-1 rounded ${priceInKobo < 20 ? 'bg-green-600' : 'bg-red-500'}`}>
            {priceInKobo < 20 ? 'NEW' : 'SALE'}
          </span>

          {/* Favourite Icon (left) */}
          <motion.button
            whileTap={{ scale: 1.3 }}
            onClick={handleFavouriteToggle}
            className="absolute top-2 left-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-1 shadow-md"
          >
            {isFavourite ? (
              <AiFillHeart size={18} className="text-yellow-400" />
            ) : (
              <AiOutlineHeart size={18} className="text-gray-600" />
            )}
          </motion.button>

          {/* Cart Icon (right) */}
          <motion.button
            whileTap={{ scale: 1.3 }}
            onClick={handleAddToCart}
            animate={cartClicked ? { scale: 1.2 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="absolute top-2 right-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-1 shadow-md"
          >
            <FiShoppingCart size={18} className="text-teal-900" />
          </motion.button>
        </div>

        <div className="p-3 flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
            <p className="text-sm text-gray-600 mb-2">{description}</p>

            {/* Ratings */}
            <div className="flex items-center mb-2 gap-1 text-yellow-500 text-sm">
              {Array.from({ length: 5 }, (_, i) => (
                <AiFillStar key={i} className={i < Math.round(rating) ? 'fill-current' : 'text-gray-300'} />
              ))}
              <span className="text-gray-500 text-xs ml-1">({rating})</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-green-600 font-bold">₦{formattedPrice}</span>
              <span className="line-through text-sm text-gray-400">₦{formatPrice(priceInKobo + 150000)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

ProductCard.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.string,
  priceInKobo: PropTypes.number,
  rating: PropTypes.number,
};

export default ProductCard;
