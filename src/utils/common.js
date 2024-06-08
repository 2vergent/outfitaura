import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
});

export const formatIndianNumber = (num) => {
  let numStr = num.toString();
  let [integerPart, decimalPart] = numStr.split(".");
  let lastThreeDigits = integerPart.slice(-3);
  let otherDigits = integerPart.slice(0, -3);
  if (otherDigits) {
    lastThreeDigits = "," + lastThreeDigits;
  }
  let formattedInteger =
    otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThreeDigits;

  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};
