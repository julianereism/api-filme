const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// conexão com mongodb
mongoose.connect('mongodb://localhost:27017/filmes_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', function () {
  console.log('Conexão com o MongoDB estabelecida.');
});

// configuração do body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// rotas
app.use('/api/filmes', require('./routes/filmes'));

// iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
