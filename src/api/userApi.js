import { axiosInstance } from "../utils/common";

export const userLoginApi = (loginUsername, loginPassword) => {
  return axiosInstance
    .post("/user/login", {
      username: loginUsername,
      password: loginPassword,
    })
    .then((res) => res.data);
};

export const userSignupApi = (loginName, loginUsername, loginPassword) => {
  return axiosInstance
    .post("/user/signup", {
      name: loginName,
      username: loginUsername,
      password: loginPassword,
    })
    .then((res) => res.data);
};
