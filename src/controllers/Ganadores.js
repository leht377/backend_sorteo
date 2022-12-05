const GanadoresRouter = require('express').Router();
const Ganadores = require('../models/Ganadores');

GanadoresRouter.get('/', async (req, res) => {
  const ganadores = await Ganadores.find().populate([
    {
      path: 'boleta_id',
      populate: [
        { path: 'cliente_id', select: ['nombre', 'cedula'] },
        { path: 'sala_id', select: 'nombre' },
        { path: 'sorteo_id', select: 'nombre' },
      ],
    },
  ]);
  res.json(ganadores);
});

GanadoresRouter.post('/', async (req, res) => {
  if (!req.body.boleta_id) {
    return res.status(400).send('Falta id de la boleta');
  }
  const ganadores = new Ganadores({
    boleta_id: req.body.boleta_id,
  });

  const ganadoresGuardado = await ganadores.save();
  res.json(ganadoresGuardado);
});

module.exports = GanadoresRouter;
