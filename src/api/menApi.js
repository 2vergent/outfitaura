import { axiosInstance } from "../utils/common";

export const getAllMenProductsApi = () => {
  return axiosInstance.get("/men/all").then((res) => res.data);
};
