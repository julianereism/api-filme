const mongoose = require('mongoose');

const filmeSchema = new mongoose.Schema({
  titulo: String,
  diretor: String,
  genero: String,
  ano: Number,
  assistido: Boolean
});

module.exports = mongoose.model('Filme', filmeSchema);
