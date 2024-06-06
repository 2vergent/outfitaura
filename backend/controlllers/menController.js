const Product = require("../models/productModel");

const getAllMenProducts = async (req, res) => {
  const menProducts = await Product.find({
    product_type: "men",
    isNewArrival: false,
    isTrending: false,
  }).exec();
  res.send(menProducts);
};

module.exports = { getAllMenProducts };
