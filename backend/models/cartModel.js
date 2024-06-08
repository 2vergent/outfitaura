const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const cartSchema = mongoose.Schema({
  product_id: {
    type: ObjectId,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
