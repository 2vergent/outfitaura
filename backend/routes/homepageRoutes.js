const express = require("express");
const homepageController = require("../controlllers/homepageController");
const router = express.Router();

router.get("/trending", homepageController.getTrendingProducts);
router.get("/new-arrivals", homepageController.getNewArrivalsProducts);

module.exports = router;
