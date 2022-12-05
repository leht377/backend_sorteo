const SorteoRouter = require('express').Router();
const Sorteo = require('../models/Sorteo');

SorteoRouter.get('/sorteoActivo', async (req, res) => {
  const sorteo = await Sorteo.findOne({ estado: 'activado' });
  res.json(sorteo);
});

// SorteoRouter.get('/:id', async (req, res) => {
//   const sorteo = await Sorteo.find({ _id: req.params.id });
//   res.json(sorteo);
// });

SorteoRouter.get('/', async (req, res) => {
  const sorteos = await Sorteo.find().sort({ estado: 1 });

  res.json(sorteos);
});

SorteoRouter.post('/', async (req, res) => {
  const sorteo = new Sorteo({
    nombre: req.body.nombre,
    fecha: req.body.fecha,
    estado: req.body.estado,
    Administrador_id: req.id_administrador,
  });

  const sortoGuardado = await sorteo.save();

  res.json(sortoGuardado);
});

SorteoRouter.put('/cambiarEstado/:id', async (req, res) => {
  const sorteosActivado = await Sorteo.findOne({ estado: 'activado' });

  if (sorteosActivado && sorteosActivado._id != req.params.id) {
    return res.status(304).send('Ya hay un sorteo activado').end();
  }

  const sorteo = await Sorteo.findById(req.params.id);

  const sorteoConNuevoEstado = {
    nombre: sorteo.nombre,
    fecha: sorteo.fecha,
    estado: sorteo.estado === 'activado' ? 'desactivado' : 'activado',
  };

  const sorteoActualizado = await Sorteo.findByIdAndUpdate(
    req.params.id,
    sorteoConNuevoEstado,
    {
      new: true,
    }
  );

  res.json(sorteoActualizado).status(200);
});

SorteoRouter.put('/:id', async (req, res) => {
  const sorteo = {
    nombre: req.body.nombre,
    fecha: req.body.fecha,
    estado: 'desactivado',
  };

  const { _id } = await Sorteo.findByIdAndUpdate(req.params.id, sorteo, {
    new: true,
  });

  const sorteoActualizado = await Sorteo.findById(_id);
  res.json(sorteoActualizado).status(200);
});

module.exports = SorteoRouter;
