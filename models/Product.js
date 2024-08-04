const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  weight: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true }
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  products: [productSchema]
});

const ecommerceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  categories: [categorySchema]
});

const Ecommerce = mongoose.model('products', ecommerceSchema);

module.exports = Ecommerce;
