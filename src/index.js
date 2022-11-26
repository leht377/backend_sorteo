const http = require('http');

const app = require('./app');
const server = http.createServer(app);
const { PORT } = require('./utils/config');

const PUERT0 = PORT || 3001;
server.listen(PUERT0, () => {
  console.log(`El servidor esta corriendo en el puerto ${PUERT0}`);
});
