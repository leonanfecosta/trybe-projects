const getSavedCartItems = () => {
  const loadCartItems = localStorage.getItem('cartItems');
  return loadCartItems;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
