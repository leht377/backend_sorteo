const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

const administradorSchema = new mongoose.Schema({
  usuario: {
    type: String,
    unique: true,
    minlength: 4,
    required: true,
  },

  contrasena: {
    type: String,
    unique: true,
    minlength: 5,
    required: true,
  },
});

administradorSchema.plugin(uniquevalidator);
const Administrador = mongoose.model('Administrador', administradorSchema);

module.exports = Administrador;
