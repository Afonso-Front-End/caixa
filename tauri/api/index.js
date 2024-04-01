const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = 3001;
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const cart = require('./routes/adicionar_ao_carrinho');
const carrinhoController = require('./routes/carrinho');

// const crypto = require('crypto');

// const generateSecretKey = () => {
//     return crypto.randomBytes(32).toString('hex');
// }

// console.log(generateSecretKey());
app.use(bodyParser.json());
app.use(express.json());
app.use(cors())

app.use('/', userRoutes);
app.use('/', productRoutes);
app.use('/', cart);
app.use('/', carrinhoController);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
