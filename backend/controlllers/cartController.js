const Cart = require("../models/cartModel");
const { ObjectId } = require("mongodb");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getProductsFromCart = async (req, res) => {
  const { userId } = req.params;

  const productsInCart = await Cart.aggregate([
    { $match: { user_id: userId } },
    {
      $lookup: {
        from: "products",
        localField: "product_id",
        foreignField: "_id",
        as: "productDetail",
      },
    },
    { $unwind: "$productDetail" },
  ]);
  res.send(productsInCart);
};

const addProductToCart = async (req, res) => {
  const { productId, userId, quantity } = req.params;
  const addedProduct = await Cart.create({
    product_id: new ObjectId(productId),
    user_id: userId,
    quantity: quantity,
  });
  res.send(addedProduct);
};

const removeProductFromCart = async (req, res) => {
  const { productId, userId } = req.params;
  const productToBeRemoved = await Cart.findOne({
    product_id: productId,
    user_id: userId,
  }).exec();
  if (productToBeRemoved) {
    await Cart.deleteOne({ _id: productToBeRemoved._id });
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
};

const removeAllProductsFromCart = async (req, res) => {
  const { userId } = req.params;
  await Cart.deleteMany({ user_id: userId });
  res.send({ success: true });
};

const incrementProductInCart = async (req, res) => {
  const { productId, userId } = req.params;
  let product = await Cart.findOne({
    product_id: productId,
    user_id: userId,
  }).exec();
  if (!product) {
    res.send({ success: false });
  } else {
    product.quantity += 1;
    await product.save();
    res.send({ success: true });
  }
};

const decrementProductInCart = async (req, res) => {
  const { productId, userId } = req.params;
  let product = await Cart.findOne({
    product_id: productId,
    user_id: userId,
  }).exec();
  if (!product) {
    res.send({ success: false });
  } else {
    product.quantity -= 1;
    await product.save();
    res.send({ success: true });
  }
};

const checkoutCart = async (req, res) => {
  const { cart_items } = req.body;

  const lineItems = cart_items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.productDetail.product_name,
        images: [item.productDetail.image_path],
      },
      unit_amount: item.productDetail.price,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "cashapp", "amazon_pay"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/cart?payment=success",
    cancel_url: "http://localhost:3000/cart?payment=failed",
  });

  res.send({ id: session.id });
};

module.exports = {
  getProductsFromCart,
  addProductToCart,
  removeProductFromCart,
  removeAllProductsFromCart,
  incrementProductInCart,
  decrementProductInCart,
  checkoutCart,
};
