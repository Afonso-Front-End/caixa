const mongoose = require('mongoose');

const vendaSchema = new mongoose.Schema({
    items: [{ 
        username: String,
        usercpf: Number,
        product_name: String,
        product_price: Number,
        quantidade: Number,
        valor_total: Number
    }],
    valorTotal: Number,
    valorPago: Number,
    tipoPagamento: String,
    troco: Number,
    data_venda: { type: Date, default: Date.now }
});

const Venda = mongoose.model('Venda', vendaSchema);

module.exports = Venda;
