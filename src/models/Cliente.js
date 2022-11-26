const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

const clienteSchema = new mongoose.Schema({
  cedula: {
    type: Number,
    unique: true,
    minlength: 4,
    required: true,
  },

  nombre: {
    type: String,
    minlength: 5,
    required: true,
  },

  telefono: {
    type: Number,
    minlength: 5,
    required: true,
  },

  correo: {
    type: String,
    minlength: 5,
    required: true,
  },
});

clienteSchema.plugin(uniquevalidator);
const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
