const mongoose = require('mongoose');

const boletaSchema = new mongoose.Schema({
  numero: {
    type: Number,
    require: true,
  },

  sala_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sala',
  },

  cliente_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
  },

  sorteo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sorteo',
  },
});

const Boleta = mongoose.model('Boleta', boletaSchema);

module.exports = Boleta;
