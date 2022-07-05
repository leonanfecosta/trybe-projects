const setFavoriteLocalStorage = (isFavorite, favorite, storage, id) => {
  if (!isFavorite) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([...storage, favorite]));
  } else {
    const filterStorage = storage.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filterStorage));
  }
};

export default setFavoriteLocalStorage;
