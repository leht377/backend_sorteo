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

  numeroGanador: {
    type: Number,
    default: 1000,
  },

  boletaGanadora: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Boleta',
  },

  fecha_sorteo: {
    type: Date,
    minlength: 5,
    required: true,
  },

  estado_sorteo: {
    type: String,
    default: 'activo',
  },

  hora_sorteo: {
    type: String,
    minlength: 5,
    required: true,
  },

  asientos_disponibles: {
    type: Number,
    minlength: 5,
    default: 50,
  },

  recaudado: {
    type: Number,
    default: 0,
  },

  sorteo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sorteo',
  },
});

const Sala = mongoose.model('Sala', salaSchema);

module.exports = Sala;
