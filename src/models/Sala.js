const mongoose = require('mongoose');

const salaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    minlength: 5,
    required: true,
  },
  precio: {
    type: Number,
    minlength: 5,
    required: true,
  },

  asientos_disponibles: {
    type: Number,
    minlength: 5,
    required: true,
    default: 50,
  },

  sorteo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sorteo',
  },
});

const Sala = mongoose.model('Sala', salaSchema);

module.exports = Sala;
