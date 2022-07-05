const getMealsByArea = async (area) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.log(error);
  }
};

export default getMealsByArea;
