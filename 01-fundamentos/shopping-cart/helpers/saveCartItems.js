const saveCartItems = (item) => {
  const cartItensList = localStorage.setItem('cartItems', item);
  return cartItensList;
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
