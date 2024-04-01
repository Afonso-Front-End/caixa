const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const cpfCheck = require('cpf-check')
require("dotenv").config()

router.post('/cadastro', async (req, res) => {
  try {
    const { username, useremail, usercpf, role} = req.body;

    // Validar se o nome não está vazio
    if (!username) {
      return res.json({ message: 'Nome não pode estar vazio.' });
    }

    // Validar o formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(useremail)) {
      return res.json({ message: 'Formato de email inválido.' });
    }

    // Validar o formato do CPF
    if (!cpfCheck.validate(usercpf)) {
      return res.json({ message: 'CPF inválido.' });
    }

    // Verificar se o email ou CPF já existem no banco de dados
    const existingUser = await User.findOne({ $or: [{ useremail }, { usercpf }] });
    if (existingUser) {
      return res.json({ message: 'Email ou CPF já cadastrados.' });
    }

    if (!role || !['admin', 'operador'].includes(role)) {
      return res.json({ message: 'Marque se e Operador ou Admin' });
    }

    // Se todas as validações passarem, cadastrar o usuário
    const newUser = new User({ username, useremail, usercpf, role });
    await newUser.save();

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, usercpf } = req.body;

    if (!username) {
      return res.json({ message: 'Nome não pode estar vazio.' });
    }

    if (!cpfCheck.validate(usercpf)) {
      return res.json({ message: 'CPF inválido.' });
    }
    // Verificar se o usuário existe na tabela
    const user = await User.findOne({ username, usercpf });

    // Se o usuário não existir, retornar uma mensagem de erro
    if (!user) {
      return res.json({ message: 'Usuário não encontrado.' });
    }

    // Se o usuário existe e a senha é válida, gerar um token
    const payload = {
      userId: user._id,
      username: user.username,
      usercpf: user.usercpf,
      role: user.role
    };

    const userdata = { ...payload, ...user };

    const token = jwt.sign({payload}, process.env.JWT_SECRET, { expiresIn: '10h' });

    // Retornar uma mensagem de sucesso com o token
    res.status(201).json({ message: 'Login bem-sucedido!', token, userdata });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao realizar o login.' });
  }
});

module.exports = router;
