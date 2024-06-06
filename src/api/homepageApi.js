import { axiosInstance } from "../utils/common";

export const getTrendingProductsApi = () => {
  return axiosInstance.get("/homepage/trending").then((res) => res.data);
};

export const getNewArrivalsProductsApi = () => {
  return axiosInstance.get("/homepage/new-arrivals").then((res) => res.data);
};
