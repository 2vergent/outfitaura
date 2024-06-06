const Product = require("../models/productModel");

const getAllWomenProducts = async (req, res) => {
  const womenProducts = await Product.find({
    product_type: "women",
    isNewArrival: false,
    isTrending: false,
  }).exec();
  res.send(womenProducts);
};

module.exports = { getAllWomenProducts };
