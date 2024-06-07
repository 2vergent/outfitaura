const express = require("express");
const cartController = require("../controlllers/cartController");
const router = express.Router();

router.get("/products/:userId", cartController.getProductsFromCart);
router.post("/add/:userId/:productId", cartController.addProductToCart);
router.post("/checkout", cartController.checkoutCart);

module.exports = router;
