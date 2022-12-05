const jwt = require('jsonwebtoken');

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const decodeToken = (request, response, next) => {
  const decodeTokens = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodeTokens.id) {
    return response.status(401).json({ error: 'Token perdido o Invalido' });
  }

  request['id_administrador'] = decodeTokens.id;
  next();
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  console.log(error.name);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request['token'] = authorization.substring(7);
  }
  next();
};

module.exports = { errorHandler, unknownEndpoint, tokenExtractor, decodeToken };
