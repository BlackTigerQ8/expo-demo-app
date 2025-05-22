import { instance } from ".";

export const getAllFood = async () => {
  const response = await instance.get("/search.php?s=");
  return response.data.meals;
};

export const getFoodById = async (id: string) => {
  const response = await instance.get(`/lookup.php?i=${id}`);
  return response.data.meals[0];
};

export const createMeal = async (mealData: any) => {
  const response = await instance.post("/meals", mealData);
  return response.data;
};
