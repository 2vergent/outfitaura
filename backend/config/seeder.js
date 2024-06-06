require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
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
  "../../assets/images/mock1.jpg",
  "../../assets/images/mock2.jpg",
  "../../assets/images/mock3.jpg",
  "../../assets/images/mock4.jpg",
  "../../assets/images/mock5.jpg",
  "../../assets/images/mock6.jpg",
  "../../assets/images/mock7.jpg",
  "../../assets/images/mock8.jpg",
  "../../assets/images/trendingMock1.jpg",
  "../../assets/images/trendingMock2.jpg",
  "../../assets/images/trendingMock3.jpg",
  "../../assets/images/trendingMock4.jpg",
  "../../assets/images/trendingMock5.jpg",
  "../../assets/images/trendingMock6.jpg",
  "../../assets/images/trendingMock7.jpg",
  "../../assets/images/trendingMock8.jpg",
  "../../assets/images/trendingMock1.jpg",
  "../../assets/images/trendingMock2.jpg",
  "../../assets/images/trendingMock3.jpg",
  "../../assets/images/trendingMock4.jpg",
  "../../assets/images/trendingMock5.jpg",
  "../../assets/images/trendingMock6.jpg",
  "../../assets/images/trendingMock7.jpg",
  "../../assets/images/trendingMock8.jpg",
  "../../assets/images/women1.jpg",
  "../../assets/images/women2.jpg",
  "../../assets/images/women3.jpg",
  "../../assets/images/women4.jpg",
  "../../assets/images/women5.jpg",
  "../../assets/images/women6.jpg",
  "../../assets/images/women7.jpg",
  "../../assets/images/women8.jpg",
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
    _id: new ObjectId(),
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
