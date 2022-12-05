const mongoose = require('mongoose');

const boletaSchema = new mongoose.Schema({
  numero: {
    type: Number,
    require: true,
  },
  valor_pagado: {
    type: Number,
    require: true,
  },

  sala_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sala',
    required: true,
  },

  cliente_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true,
  },

  sorteo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sorteo',
    required: true,
  },
});

const Boleta = mongoose.model('Boleta', boletaSchema);

module.exports = Boleta;
