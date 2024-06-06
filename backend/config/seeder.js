require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const Product = require("../models/productModel");

const productNames = [
  "Warning Shirt",
  "Floral Shirt",
  "Blacked Out Shirt",
  "Japanese Original",
  "Breather Original",
  "Unique Top",
  "Slay Outfit",
  "Party Night Outfit",
  "Green Lines",
  "Black n' White",
  "Sapped Brown",
  "Casual Party Wear",
  "The Goofy One",
  "Kaki Gen-Z Version",
  "Pysched Shirt",
  "The Many-Faced God",
  "Green Lines",
  "Black n' White",
  "Sapped Brown",
  "Casual Party Wear",
  "The Goofy One",
  "Kaki Gen-Z Version",
  "Pysched Shirt",
  "The Many-Faced God",
  "Green Casuals",
  "Blue Casuals",
  "Women's Joggers",
  "Casual Pants",
  "Crop Top",
  "Professional Pants",
  "Sky Casuals",
  "Party Night Pants",
];

const productTypes = [
  "men",
  "men",
  "men",
  "men",
  "women",
  "women",
  "women",
  "women",
  "men",
  "men",
  "men",
  "men",
  "men",
  "men",
  "men",
  "men",
  "men",
  "men",
  "men",
  "men",
  "men",
  "men",
  "men",
  "men",
  "women",
  "women",
  "women",
  "women",
  "women",
  "women",
  "women",
  "women",
];

const imagePaths = [
  "mock1.jpg",
  "mock2.jpg",
  "mock3.jpg",
  "mock4.jpg",
  "mock5.jpg",
  "mock6.jpg",
  "mock7.jpg",
  "mock8.jpg",
  "trendingMock1.jpg",
  "trendingMock2.jpg",
  "trendingMock3.jpg",
  "trendingMock4.jpg",
  "trendingMock5.jpg",
  "trendingMock6.jpg",
  "trendingMock7.jpg",
  "trendingMock8.jpg",
  "trendingMock1.jpg",
  "trendingMock2.jpg",
  "trendingMock3.jpg",
  "trendingMock4.jpg",
  "trendingMock5.jpg",
  "trendingMock6.jpg",
  "trendingMock7.jpg",
  "trendingMock8.jpg",
  "women1.jpg",
  "women2.jpg",
  "women3.jpg",
  "women4.jpg",
  "women5.jpg",
  "women6.jpg",
  "women7.jpg",
  "women8.jpg",
];

const prices = [
  1200, 1300, 2000, 2200, 3000, 3500, 4500, 3600, 1800, 1900, 2000, 2200, 1000,
  1100, 900, 1200, 1800, 1900, 2000, 2200, 1000, 1100, 900, 1200, 3000, 3500,
  4500, 3600, 3000, 3500, 4500, 3600,
];

const isNewArrivals = [
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

const isTrendings = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

const products = [];
for (let i = 0; i < productNames.length; i++) {
  const product = {
    product_name: productNames[i],
    product_type: productTypes[i],
    price: prices[i],
    image_path: imagePaths[i],
    isNewArrival: isNewArrivals[i],
    isTrending: isTrendings[i],
  };
  products.push(product);
}

mongoose.connect(process.env.MONGO_URL).then(async () => {
  console.log("Connected to Database for Seeding");
  try {
    await Product.insertMany(products);
    console.log("Database Seeding Complete!");
  } catch (error) {
    console.log("An Error occured while seeding: ", error);
  } finally {
    await mongoose.disconnect();
    console.log("Database connection closed");
    process.exit(0);
  }
});
