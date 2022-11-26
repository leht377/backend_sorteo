const mongoose = require('mongoose');

const ganadoresSchema = new mongoose.Schema({
  boleta_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Boleta',
  },
});

const Ganadores = mongoose.model('Ganadores', ganadoresSchema);

module.exports = Ganadores;
