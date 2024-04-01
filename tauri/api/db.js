const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/BASEDATAMERCADO', {});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Erro de conexão com o MongoDB:', error);
});

db.once('open', () => {
  console.log('Conectado ao banco de dados MongoDB!');
});

module.exports = mongoose;
