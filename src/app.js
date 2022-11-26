const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const middlewares = require('./utils/middlewares');

const { MONGOURI } = require('./utils/config');

const app = express();

require('express-async-errors');

mongoose
  .connect(MONGOURI)
  .then(() => {
    console.log('Mongo esta corriendo');
  })
  .catch((error) => {
    console.log(error);
  });

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

const AdministradorRouter = require('./controllers/Administrador');
app.use('/api/Administrador', AdministradorRouter);

const BoletaRouter = require('./controllers/Boleta');
app.use('/api/Boleta', BoletaRouter);

const ClienteRouter = require('./controllers/Cliente');
app.use('/api/Cliente', ClienteRouter);

const SalaRouter = require('./controllers/Sala');
app.use('/api/Sala', SalaRouter);

const SorteoRouter = require('./controllers/Sorteo');
app.use('/api/Sorteo', SorteoRouter);

const GanadoresRouter = require('./controllers/Ganadores');
app.use('/api/Ganadores', GanadoresRouter);

const loginRouter = require('./controllers/login');
app.use('/api/login', loginRouter);

app.use(middlewares.unknownEndpoint);
app.use(middlewares.errorHandler);

module.exports = app;
