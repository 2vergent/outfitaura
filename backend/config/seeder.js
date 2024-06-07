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
  "https://ucarecdn.com/b6516ac4-1af9-449b-9cb1-24c0ca643551/mock1.jpg",
  "https://ucarecdn.com/66f08559-c108-4f08-aa9e-7b19a6fa2469/mock2.jpg",
  "https://ucarecdn.com/3cd1e261-c7ba-4859-9399-16f85415402d/mock3.jpg",
  "https://ucarecdn.com/a00e9b56-3fdc-4bda-8432-8044682f54c1/mock4.jpg",
  "https://ucarecdn.com/0aad72a0-2271-49e8-b2f5-5d48abd25435/mock5.jpg",
  "https://ucarecdn.com/613a2614-91ff-4e0f-b4ba-fac565a83536/mock6.jpg",
  "https://ucarecdn.com/6bdd8859-cef8-4128-a6db-c9edbb5fb246/mock7.jpg",
  "https://ucarecdn.com/575b214b-6853-4057-a1e0-0f870fafbe23/mock8.jpg",
  "https://ucarecdn.com/2765c3d6-9d15-489d-bb66-099892af03f4/trendingMock1.jpg",
  "https://ucarecdn.com/b6b3e087-b50b-4245-8b4a-3856e10e3781/trendingMock2.jpg",
  "https://ucarecdn.com/eb907798-91d3-4a27-af59-86c31cc4d415/trendingMock3.jpg",
  "https://ucarecdn.com/a87e0d88-3a16-481c-a53d-1a7c9951d2eb/trendingMock4.jpg",
  "https://ucarecdn.com/7ddabfc0-b6f5-425b-a1ba-0f47d46e519d/trendingMock5.jpg",
  "https://ucarecdn.com/c581db88-8fe4-4ed4-aae8-62209a01a307/trendingMock6.jpg",
  "https://ucarecdn.com/946f6a71-0ef5-4871-a7b2-40eca0ae5a67/trendingMock7.jpg",
  "https://ucarecdn.com/60ad2ef5-304a-4e59-aac8-e92aa0f9b8a3/trendingMock8.jpg",
  "https://ucarecdn.com/2765c3d6-9d15-489d-bb66-099892af03f4/trendingMock1.jpg",
  "https://ucarecdn.com/b6b3e087-b50b-4245-8b4a-3856e10e3781/trendingMock2.jpg",
  "https://ucarecdn.com/eb907798-91d3-4a27-af59-86c31cc4d415/trendingMock3.jpg",
  "https://ucarecdn.com/a87e0d88-3a16-481c-a53d-1a7c9951d2eb/trendingMock4.jpg",
  "https://ucarecdn.com/7ddabfc0-b6f5-425b-a1ba-0f47d46e519d/trendingMock5.jpg",
  "https://ucarecdn.com/c581db88-8fe4-4ed4-aae8-62209a01a307/trendingMock6.jpg",
  "https://ucarecdn.com/946f6a71-0ef5-4871-a7b2-40eca0ae5a67/trendingMock7.jpg",
  "https://ucarecdn.com/60ad2ef5-304a-4e59-aac8-e92aa0f9b8a3/trendingMock8.jpg",
  "https://ucarecdn.com/194f1ca3-ae3b-42fd-ae94-a7b757cdab09/women1.jpg",
  "https://ucarecdn.com/fe5ebba6-090d-4971-a7bd-d055416bdcfd/women2.jpg",
  "https://ucarecdn.com/f9381140-c03e-47b9-84eb-af3caa4fe50f/women3.jpg",
  "https://ucarecdn.com/c5993f8d-0857-49fc-910f-464aa33b6497/women4.jpg",
  "https://ucarecdn.com/92992fff-b07b-492e-90e4-1fb695503129/women5.jpg",
  "https://ucarecdn.com/d8ac491b-8a8d-4ea5-bac1-8bd4c70af719/women6.jpg",
  "https://ucarecdn.com/931eb642-52a4-455f-ade3-41d9e9d95499/women7.jpg",
  "https://ucarecdn.com/5a1103a3-e1e7-4301-9417-decec75b6974/women8.jpg",
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
