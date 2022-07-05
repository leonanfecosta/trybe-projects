export const addIngredient = (storage, type, name, id) => {
  if (type === 'meals') {
    const backupIngredients = storage.meals[id] || [];
    storage.meals[id] = [...backupIngredients, name];
    localStorage.setItem('inProgressRecipes', JSON.stringify(storage));
  } else {
    const backupIngredients = storage.cocktails[id] || [];
    storage.cocktails[id] = [...backupIngredients, name];
    localStorage.setItem('inProgressRecipes', JSON.stringify(storage));
  }
};

export const removeIngredient = (storage, type, name, id) => {
  if (type === 'meals') {
    const backupIngredients = storage.meals[id].filter((item) => item !== name);
    storage.meals[id] = [...backupIngredients];
    localStorage.setItem('inProgressRecipes', JSON.stringify(storage));
  } else {
    const backupIngredients = storage.cocktails[id].filter((item) => item !== name);
    storage.cocktails[id] = [...backupIngredients];
    localStorage.setItem('inProgressRecipes', JSON.stringify(storage));
  }
};
