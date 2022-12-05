const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const Administrador = require('../models/Administrador');

loginRouter.post('/', async (request, response) => {
  const body = request.body;

  const administrador = await Administrador.findOne({ usuario: body.usuario });
  const passwordCorrect =
    administrador === null
      ? false
      : await bcrypt.compare(body.contrasena, administrador.contrasena);

  if (!(administrador && passwordCorrect)) {
    return response.status(401).json({
      error: 'Usuario o Contraseña invalido',
    });
  }

  const userForToken = {
    usuario: administrador.usuario,
    id: administrador._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response
    .status(200)
    .send({ token, usuario: administrador.usuario, id: Administrador._id });
});

module.exports = loginRouter;
