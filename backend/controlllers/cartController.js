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
  const { productId, userId } = req.params;
  const addedProduct = await Cart.create({
    product_id: new ObjectId(productId),
    user_id: userId,
    count: 1,
  });
  res.send(addedProduct);
};

const checkoutCart = async (req, res) => {
  const { cart_items } = req.body;

  const lineItems = cart_items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.productDetail.product_name,
      },
      unit_amount: item.productDetail.price,
    },
    quantity: item.count,
  }));

  console.log("lineItems: ", lineItems);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/payment/success",
    cancel_url: "http://localhost:3000/payment/cancelled",
  });

  res.send({ id: session.id });
};

module.exports = { getProductsFromCart, addProductToCart, checkoutCart };
