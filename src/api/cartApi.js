import { axiosInstance } from "../utils/common";

export const getProductsFromCart = (userId) => {
  return axiosInstance.get(`/cart/products/${userId}`).then((res) => res.data);
};

export const addProductToCardApi = (productId, userId, quantity) => {
  return axiosInstance
    .post(`/cart/add/${userId}/${productId}/${quantity}`)
    .then((res) => res.data);
};

export const removeProductFromCardApi = (productId, userId) => {
  return axiosInstance
    .post(`/cart/remove/${userId}/${productId}`)
    .then((res) => res.data);
};

export const removeAllProductsFromCartApi = (userId) => {
  return axiosInstance.post(`/cart/remove/${userId}`).then((res) => res.data);
};

export const incrementProductInCartApi = (productId, userId) => {
  return axiosInstance
    .patch(`/cart/increment/${userId}/${productId}`)
    .then((res) => res.data);
};

export const decrementProductInCartApi = (productId, userId) => {
  return axiosInstance
    .patch(`/cart/decrement/${userId}/${productId}`)
    .then((res) => res.data);
};

export const cartCheckoutApi = (cartItems) => {
  return axiosInstance
    .post("/cart/checkout", { cart_items: cartItems })
    .then((res) => res.data);
};
