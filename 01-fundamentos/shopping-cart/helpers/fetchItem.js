const fetchItem = async (itemID) => {
  try {
    const endpoint = `https://api.mercadolibre.com/items/${itemID}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
