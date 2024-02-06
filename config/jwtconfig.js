const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

function gerarToken (usuario) {
  return jwt.sign( { id: usuario.id, login: usuario.login }, jwtSecret, { expiresIn: '1h' } );
}

function verificarToken (token) {
  return jwt.verify (token, jwtSecret);
}

module.exports = { gerarToken, verificarToken };