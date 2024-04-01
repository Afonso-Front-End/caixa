const express = require('express');
const router = express.Router();
const Product = require('../models/Products');
const Carrinho = require('../models/Carrinho');
const Venda = require('../models/Venda');
const Decimal = require("decimal.js")

router.delete('/cancelar-compra', async (req, res) => {
    try {
        const itensCarrinho = await Carrinho.find();

        for (const carrinhoItem of itensCarrinho) {
            for (const item of carrinhoItem.items) {
                try {

                    const product = await Product.findOne({ product_code: item.product_code });

                    if (!product) {
                        console.error(`Produto com código ${item.product_code} não encontrado.`);
                        continue;
                    }

                    product.product_unit += item.quantidade;

                    await product.save();
                } catch (error) {
                    console.error(`Erro ao atualizar estoque para o produto com código ${item.product_code}:`, error);
                }
            }
        }

        await Carrinho.deleteMany();

        res.status(200).json({ message: 'Compra cancelada com sucesso. Itens retornados ao estoque.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cancelar compra.' });
    }
});

router.get('/list-vendas', async (req, res) => {
    try {
        const historico = await Venda.find()
        res.status(200).json({ historico })

    } catch (error) {
        res.status(500).json({ message: "Erro ao reqcuperar a lista de produtos." })
    }
})

router.post('/finalizar-compra', async (req, res) => {
    try {
        const { valorPago, tipoPagamento } = req.body;
        if (!valorPago || !tipoPagamento) {
            return res.status(201).json({ message: 'O valor e o tipo de pagamento são obrigatórios.' });
        }

        const tiposValidos = ['credito', 'debito', 'dinheiro', 'pix', 'aprazo'];
        if (!tiposValidos.includes(tipoPagamento)) {
            return res.status(201).json({ message: 'O tipo de pagamento deve ser informado corretamente.' });
        }

        let carrinho = await Carrinho.findOne();
        if (!carrinho) {
            return res.status(404).json({ message: 'Carrinho não encontrado.' });
        }

        let troco = 0;
        if (valorPago < carrinho.subtotal) {
            carrinho.subtotal -= valorPago;
            await carrinho.save();
            return res.status(200).json({ message: 'Compra finalizada com sucesso. Valor atualizado.' });
        } else if (valorPago >= carrinho.subtotal) {
            troco = valorPago - carrinho.subtotal;
            carrinho.subtotal = 0;
            await carrinho.save();
            await Carrinho.deleteMany();
        }

        res.status(200).json({ message: 'Compra finalizada com sucesso.', troco });

    } catch (error) {
        res.status(500).json({ message: 'Erro ao finalizar a compra.' });
        console.log(error);
    }
});

router.post('/to-ad-cart', async (req, res) => {
    try {
        const { username, usercpf, product_code, quantidade } = req.body;

        const produto = await Product.findOne({ product_code });

        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }
        
        let carrinho = await Carrinho.findOne({ username, usercpf });

        if (!carrinho) {
            carrinho = new Carrinho({
                username,
                usercpf,
                items: []
            });
        }

        const existingItemIndex = carrinho.items.findIndex(item => item.product_code === produto.product_code);

        if (existingItemIndex !== -1) {
            // Se o item já existir no carrinho, atualize a quantidade e o total
            carrinho.items[existingItemIndex].quantidade += parseInt(quantidade);
            carrinho.items[existingItemIndex].total = carrinho.items[existingItemIndex].product_price * carrinho.items[existingItemIndex].quantidade;
        } else {
            // Caso contrário, adicione um novo item ao carrinho
            carrinho.items.push({
                product_code: produto.product_code,
                product_name: produto.product_name,
                product_price: produto.product_price,
                product_unit: produto.product_unit,
                quantidade,
                total: produto.product_price * quantidade
            });
        }

        // Calcule o subtotal como a soma dos totais dos itens no carrinho
        carrinho.subtotal = parseFloat(carrinho.items.reduce((acc, item) => acc + parseFloat(item.total), 0).toFixed(2));


        // Salve as alterações no carrinho e no produto
        await carrinho.save();
        produto.product_unit -= quantidade;
        await produto.save();

        res.status(200).json({ message: 'Produto adicionado ao carrinho com sucesso.' });
    } catch (error) {
        console.error('Erro ao adicionar produto ao carrinho:', error);
        res.status(500).json({ message: 'Erro ao adicionar produto ao carrinho.' });
    }
});

module.exports = router;
