const mongoose = require('mongoose');

const sorteoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    minlength: 5,
    required: true,
  },
  fecha: {
    type: Date,
    minlength: 5,
    required: true,
  },
  estado: {
    type: String,
    default: 'desactivado',
  },
});

const Sorteo = mongoose.model('Sorteo', sorteoSchema);

module.exports = Sorteo;
