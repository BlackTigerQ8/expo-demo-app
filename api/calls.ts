import { instance } from ".";

export const getAllFood = async () => {
  const response = await instance.get("/search.php?s=");
  return response.data.meals;
};

export const getFoodById = async (id: string) => {
  const response = await instance.get(`/lookup.php?i=${id}`);
  return response.data.meals[0];
};
