const SalaRouter = require('express').Router();
const { generarNumero } = require('../helpers/generarNumero');
const Sala = require('../models/Sala');
const Boleta = require('../models/Boleta');
const Sorteo = require('../models/Sorteo');
const Ganadores = require('../models/Ganadores');

SalaRouter.get('/:id', async (req, res) => {
  const sala = await Sala.findById(req.params.id);
  res.json(sala);
});

SalaRouter.get('/', async (req, res) => {
  const sorteo = await Sorteo.findOne({ estado: 'activado' });
  if (!sorteo) {
    return res.status(402).send('Active algun sorteo');
  }

  const salasPorSorteo = await Sala.find({ sorteo_id: sorteo._id });
  res.json(salasPorSorteo);
});

SalaRouter.delete('/:id', async (req, res) => {
  await Sala.findByIdAndRemove(req.params.id);
  return res.status(204).end();
});

SalaRouter.post('/', async (req, res) => {
  const sorteo = await Sorteo.findOne({ estado: 'activado' });
  if (!sorteo) {
    return res.status(402).send('Active alguna sala');
  }
  const sala = new Sala({
    nombre: req.body.nombre,
    precio: req.body.precio,
    fecha_sorteo: req.body.fecha_sorteo,
    hora_sorteo: req.body.hora_sorteo,
    sorteo_id: sorteo._id,
  });

  const salaGuardada = await sala.save();

  res.json(salaGuardada);
});

SalaRouter.put('/:id', async (req, res) => {
  const sala = {
    nombre: req.body.nombre,
    precio: req.body.precio,
    sorteo_id: req.body.sorteo_id,
    asientos_disponibles: req.body.asientos_disponibles,
    hora_sorteo: req.body.hora_sorteo,
    fecha_sorteo: req.body.fecha_sorteo,
  };

  const { _id } = await Sala.findByIdAndUpdate(req.params.id, sala, {
    new: true,
  });

  const salaActualizada = await Sala.findById(_id);
  res.json(salaActualizada).status(200);
});

SalaRouter.post('/elegirGanador', async (req, res) => {
  const NumeroGanador = 43; //generarNumero([]);
  const idSala = req.body._id;

  const SalaSolicitada = await Sala.findById(idSala);

  if (SalaSolicitada.estado_sorteo === 'finalizado') {
    const idBoleta = SalaSolicitada.boletaGanadora;
    if (idBoleta) {
      const BoletaGanadoras = await Boleta.findById(idBoleta).populate(
        'cliente_id'
      );
      console.log('entro aca');
      return res
        .json({
          NumeroGanador: SalaSolicitada.numeroGanador,
          Ganador: BoletaGanadoras.cliente_id,
        })
        .status(200);
    }
    return res
      .json({
        NumeroGanador: SalaSolicitada.numeroGanador,
        Ganador: 'No hay ganador',
      })
      .status(200);
  }

  const BoletaGanadora = await Boleta.findOne({
    sala_id: req.body._id,
    numero: NumeroGanador,
  }).populate('cliente_id', {
    cedula: 1,
    nombre: 1,
  });

  if (BoletaGanadora === null) {
    await Sala.findByIdAndUpdate(req.body._id, {
      estado_sorteo: 'finalizado',
      numeroGanador: NumeroGanador,
    });
    return res
      .json({ NumeroGanador: NumeroGanador, Ganador: 'No hay ganador' })
      .status(200);
  }

  const Ganador = new Ganadores({
    boleta_id: BoletaGanadora._id,
  });
  await Ganador.save();
  await Sala.findByIdAndUpdate(req.body._id, {
    estado_sorteo: 'finalizado',
    boletaGanadora: BoletaGanadora._id,
    numeroGanador: NumeroGanador,
  });

  res.json({ NumeroGanador: NumeroGanador, Ganador: BoletaGanadora });
});

module.exports = SalaRouter;
