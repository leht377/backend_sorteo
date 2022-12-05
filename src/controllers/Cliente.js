const ClienteRouter = require('express').Router();
const Cliente = require('../models/Cliente');

ClienteRouter.get('/:id', async (req, res) => {
  const cliente = await Cliente.findById(req.params.id);
  res.json(cliente).status(200);
});

// ClienteRouter.get('/sala/:sala_id', async (req, res) => {
//   const clientesPorSala = await Cliente.find({});
// });

ClienteRouter.post('/', async (req, res) => {
  const clienteRegistrado = await Cliente.findOne({ cedula: req.body.cedula });

  if (clienteRegistrado) {
    return res.json(clienteRegistrado).status(200);
  }

  const cliente = new Cliente({
    nombre: req.body.nombre,
    cedula: req.body.cedula,
    correo: req.body.correo,
    telefono: req.body.telefono,
  });

  const clienteGuardado = await cliente.save();

  res.json(clienteGuardado).status(200);
});

module.exports = ClienteRouter;
