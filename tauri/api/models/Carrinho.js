const mongoose = require('mongoose');
const { Decimal128 } = mongoose.Schema.Types; 
process.env.TZ = 'America/Sao_Paulo';

function generateUniqueVendaCode() {
    let codigo_venda = '';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    for (let i = 0; i < 2; i++) {
        codigo_venda += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    for (let i = 0; i < 6; i++) {
        codigo_venda += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    return codigo_venda;
}

const carrinhoSchema = new mongoose.Schema({
    codigo_venda: {
        type: String,
        unique: true,
        default: generateUniqueVendaCode 
    },
    username: String,
    usercpf: Number,
    items: [{
        product_code: String, 
        product_name: String, 
        product_price: Decimal128, 
        product_unit: Number, 
        quantidade: { type: Number, default: 1 },
        total: Decimal128, 
        data_venda: { type: Date, default: Date.now }
    }],
    subtotal: { type: Decimal128, default: 0 } 
});


const Carrinho = mongoose.model('carrinho', carrinhoSchema);

module.exports = Carrinho;

