const express = require('express');
const router = express.Router();
const Product = require('../models/Products');
require("dotenv").config()

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        // O usuário é um administrador, permita o acesso
        next();
    } else {
        // O usuário não é um administrador, negue o acesso
        console.log(req.user)
        res.status(403).json({ message: 'Acesso negado.' });
    }
};

router.post('/register-product', async (req, res) => {
    try {
        const { product_code, product_name, product_price, product_unit } = req.body

        if (product_code === "") {
            return res.json({ message: "Digite o codigo de barras do produto." })
        }
        if (product_code.length <= 5) {
            return res.json({ message: "Codigo de barra deve conter mais que 5 digitos." })
        }

        if (product_name === "") {
            return res.json({ message: "O nome do produto deve ser prenchido." })
        }

        if (product_price === 0) {
            return res.json({ message: "O preco do produto deve ser preenchido." })
        }

        if (product_unit === "") {
            return res.json({ message: "A quantidade do produto deve ser informada." })
        }

        const existingCode = await Product.findOne({ $or: [{ product_code }] });
        if (existingCode) {
            return res.json({ message: `Codigo do produto ${product_code} ja existente.` })
        }

        const existingName = await Product.findOne({ $or: [{ product_name }] })
        if (existingName) {
            return res.json({ message: `Nome do produto ${product_name} ja existente.` })
        }

        const newProduct = new Product({ product_code, product_name, product_price, product_unit });
        await newProduct.save()

        res.status(201).json({ message: `Produto ${product_name} cadastrado com sucesso.` })

    } catch (error) {
        res.status(500).json({ message: "Erro ao registrar produto no banco de dados." })
    }
})

router.delete('/delete-product/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.json({ message: 'Produto não encontrado.' });
        }

        res.status(201).json({ message: 'Produto excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir o produto:', error);
        res.status(500).json({ message: 'Erro ao excluir o produto.' });
    }
});

router.put('/edit-product/:id', async (req, res) => {
    const productId = req.params.id;
    const { product_name, product_price, product_unit } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { product_name, product_price, product_unit },
            { new: true } // Retorna o documento atualizado
        );

        if (!updatedProduct) {
            return res.json({ message: 'Produto não encontrado.' });
        }

        res.status(201).json({ message: 'Produto atualizado com sucesso.', updatedProduct });
    } catch (error) {
        console.error('Erro ao editar o produto:', error.reason);
        res.status(500).json({ message: 'Erro ao editar o produto.' });
    }
});

router.get('/list-products', async (req, res) => {
    try {
        const products = await Product.find()
        res.status(201).json({ products })
    } catch (error) {
        res.status(500).json({ message: "Erro ao reqcuperar a lista de produtos." })
    }
})

router.get('/search-products', async (req, res) => {
    const { query } = req.query;

    try {
        if (!query) {
            return res.status(400).json({ message: "A consulta não pode estar vazia." });
        }

        let produtosEncontrados;

        if (query.length === 1) {
            produtosEncontrados = await Product.find({
                $or: [
                    { product_name: { $regex: `^${query}`, $options: 'i' } }, // Pesquisa por nome começando com a letra
                    { product_code: { $regex: `^${query}`, $options: 'i' } } // Pesquisa por código começando com a letra
                ]
            });
        } else {
            produtosEncontrados = await Product.find({
                $or: [
                    { product_name: { $regex: query, $options: 'i' } }, // Pesquisa por nome (case-insensitive)
                    { product_code: { $regex: query, $options: 'i' } } // Pesquisa por código (case-insensitive)
                ]
            });
        }

        if (produtosEncontrados.length === 0) {
            return res.status(404).json({ message: "Nenhum produto encontrado." });
        }

        return res.status(200).json({ products: produtosEncontrados });

    } catch (error) {
        console.error('Erro ao pesquisar produtos:', error);
        res.status(500).json({ message: 'Erro ao pesquisar produtos.' });
    }
});



module.exports = router;