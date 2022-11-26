require('dotenv').config();

const MONGOURI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

module.exports = { MONGOURI, PORT };
