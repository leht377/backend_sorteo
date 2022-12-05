const mongoose = require('mongoose');

const ganadoresSchema = new mongoose.Schema({
  boleta_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Boleta',
    require: true,
  },
});

const Ganadores = mongoose.model('Ganadores', ganadoresSchema);

module.exports = Ganadores;
