import { useEffect, useState } from "react";
import ProductCard from "../../Product/ProductCard";

const ProductSlider = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 5;

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  // 🔁 Autoplay slider
  useEffect(() => {
    if (products.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 < products.length - (visibleCards - 1)
          ? prevIndex + 1
          : 0
      );
    }, 2500); // ⏱ Change every 2.5 seconds

    return () => clearInterval(interval); // cleanup
  }, [products]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < products.length - (visibleCards - 1) ? prevIndex + 1 : 0
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : products.length - visibleCards
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-10 relative overflow-hidden">
      <div
        className="flex gap-5 transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            priceInKobo={product.priceInKobo}
            image={product.image || product.images?.[0]}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700 p-3 rounded-full text-white"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-700 p-3 rounded-full text-white"
      >
        ❯
      </button>
    </div>
  );
};

export default ProductSlider;
