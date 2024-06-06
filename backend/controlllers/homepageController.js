const Product = require("../models/productModel");

const getNewArrivalsProducts = async (req, res) => {
  const trendingProducts = await Product.find({ isNewArrival: true });
  res.send(trendingProducts);
};

const getTrendingProducts = async (req, res) => {
  const trendingProducts = await Product.find({ isTrending: true });
  res.send(trendingProducts);
};

module.exports = { getTrendingProducts, getNewArrivalsProducts };
