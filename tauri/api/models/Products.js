const mongoose = require('../db');
const Decimal = require('decimal.js');

const productSchema = new mongoose.Schema({
    product_code: String,
    product_name: String,
    product_price: { type: mongoose.Schema.Types.Decimal128, get: v => new Decimal(v.toString()) },
    product_unit: Number,
});

const Products = mongoose.model('products', productSchema);

module.exports = Products;
