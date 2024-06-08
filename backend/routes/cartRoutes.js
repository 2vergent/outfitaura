const express = require("express");
const cartController = require("../controlllers/cartController");
const router = express.Router();

router.get("/products/:userId", cartController.getProductsFromCart);
router.post(
  "/add/:userId/:productId/:quantity",
  cartController.addProductToCart
);
router.post("/remove/:userId/:productId", cartController.removeProductFromCart);
router.post("/remove/:userId", cartController.removeAllProductsFromCart);
router.patch(
  "/increment/:userId/:productId",
  cartController.incrementProductInCart
);
router.patch(
  "/decrement/:userId/:productId",
  cartController.decrementProductInCart
);
router.post("/checkout", cartController.checkoutCart);

module.exports = router;
