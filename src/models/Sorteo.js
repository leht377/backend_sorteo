const mongoose = require('mongoose');

const sorteoSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    minlength: 5,
    required: true,
  },
  estado: {
    type: Number,
    default: 'activo',
  },

  administrador_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Administrador',
  },
});

const Sorteo = mongoose.model('Sorteo', sorteoSchema);

module.exports = Sorteo;
