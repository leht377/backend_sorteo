const BoletaRouter = require('express').Router();
const Boleta = require('../models/Boleta');
const { generarNumero } = require('../helpers/generarNumero');
const Sala = require('../models/Sala');
BoletaRouter.get('/:id', async (req, res) => {
  const boleta = await Boleta.findById(req.params.id).populate('cliente_id', {
    cedula: 1,
    nombre: 1,
    telefono: 1,
    correo: 1,
  });
  res.json(boleta).status(200);
});

BoletaRouter.get('/sala/:sala_id', async (req, res) => {
  const boletasPorSala = await Boleta.find({
    sala_id: req.params.sala_id,
  }).populate('cliente_id', {
    cedula: 1,
    nombre: 1,
    telefono: 1,
    correo: 1,
  });
  res.json(boletasPorSala).status(200);
});

BoletaRouter.post('/', async (req, res) => {
  const boletas = await Boleta.find({
    sala_id: req.params.sala_id,
  });

  const numeroBoleta = generarNumero(boletas);

  const boleta = new Boleta({
    numero: numeroBoleta,
    cliente_id: req.body.cliente_id,
    sala_id: req.body.sala_id,
    sorteo_id: req.body.sorteo_id,
    valor_pagado: req.body.precio,
  });

  const boletaGuardada = await boleta.save();

  const sala = await Sala.findById(req.body.sala_id);

  const recaudado = sala.recaudado + req.body.precio;
  const asientos_disponibles = sala.asientos_disponibles - 1;

  await Sala.findByIdAndUpdate(
    req.body.sala_id,
    { recaudado: recaudado, asientos_disponibles: asientos_disponibles },
    {
      new: true,
    }
  );
  res.json(boletaGuardada).status(200);
});

module.exports = BoletaRouter;
