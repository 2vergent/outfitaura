import { axiosInstance } from "../utils/common";

export const getAllWomenProductsApi = () => {
  return axiosInstance.get("/women/all").then((res) => res.data);
};
