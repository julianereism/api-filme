const express = require('express');
const router = express.Router();
const Filme = require('../models/filme');

// listar todos os filmes
router.get('/', async (req, res) => {
  try {
    const filmes = await Filme.find();
    res.json(filmes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// criar um novo filme
router.post('/', async (req, res) => {
  const filme = new Filme({
    titulo: req.body.titulo,
    diretor: req.body.diretor,
    genero: req.body.genero,
    ano: req.body.ano,
    assistido: req.body.assistido
  });

  try {
    const novoFilme = await filme.save();
    res.status(201).json(novoFilme);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// atualizar um filme
router.patch('/:id', async (req, res) => {
  try {
    const filme = await Filme.findById(req.params.id);
    if (req.body.titulo) {
      filme.titulo = req.body.titulo;
    }
    if (req.body.diretor) {
      filme.diretor = req.body.diretor;
    }
    if (req.body.genero) {
      filme.genero = req.body.genero;
    }
    if (req.body.ano) {
      filme.ano = req.body.ano;
    }
    if (req.body.assistido !== undefined) {
      filme.assistido = req.body.assistido;
    }
    const filmeAtualizado = await filme.save();
    res.json(filmeAtualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// deletar um filme
router.delete('/:id', async (req, res) => {
  try {
    await Filme.findByIdAndRemove(req.params.id);
    res.json({ message: 'Filme deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
