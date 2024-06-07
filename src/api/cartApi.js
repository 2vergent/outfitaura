import { axiosInstance } from "../utils/common";

export const getProductsFromCart = (userId) => {
  return axiosInstance.get(`/cart/products/${userId}`).then((res) => res.data);
};

export const addProductToCardApi = (productId, userId) => {
  return axiosInstance
    .post(`/cart/add/${userId}/${productId}`)
    .then((res) => res.data);
};

export const removeProductFromCardApi = (productId, userId) => {
  return axiosInstance
    .post(`/cart/remove/${userId}/${productId}`)
    .then((res) => res.data);
};

export const cartCheckoutApi = (cartItems) => {
  return axiosInstance
    .post("/cart/checkout", { cart_items: cartItems })
    .then((res) => res.data);
};
