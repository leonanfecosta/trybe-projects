const verifyChecked = (name, id) => {
  const { meals, cocktails } = JSON
    .parse(localStorage.getItem('inProgressRecipes')) || [];

  if (meals && meals[id]?.includes(name)) {
    return true;
  }
  if (cocktails && cocktails[id]?.includes(name)) {
    return true;
  }
  return false;
};

export default verifyChecked;
