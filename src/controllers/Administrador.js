const bcrypt = require('bcrypt');

const administradorRouter = require('express').Router();
const Administrador = require('../models/Administrador');

administradorRouter.get('/:id', async (request, response) => {
  const administrador = await Administrador.findById(request.params.id);

  response.json(administrador);
});

administradorRouter.post('/', async (request, response) => {
  const bodyAdministrador = request.body;
  if (!bodyAdministrador.usuario || !bodyAdministrador.contrasena) {
    response.status(400).json({
      error: 'Nombre de administrador o Contraseña no se encuentran ',
    });
  }
  const saltRounds = 10;
  const contrasenaHash = await bcrypt.hash(
    bodyAdministrador.contrasena,
    saltRounds
  );

  const administrador = new Administrador({
    usuario: bodyAdministrador.usuario,
    contrasena: contrasenaHash,
  });

  const savedUse = await administrador.save();
  response.status(201).json(savedUse);
});

module.exports = administradorRouter;
