const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image_path: {
    type: String,
    required: true,
  },
  isNewArrival: {
    type: Boolean,
    default: false,
  },
  isTrending: {
    type: Boolean,
    default: false,
  },
});

productSchema.plugin(aggregatePaginate);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
