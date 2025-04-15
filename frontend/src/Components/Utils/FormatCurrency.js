export const formatPrice = (priceInKobo) => {
  const price = priceInKobo / 100; 
  return price.toLocaleString(undefined, { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  });
};