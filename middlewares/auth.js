const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtconfig');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const decodedToken = jwtConfig.verificarToken(token);
      req.usuario = decodedToken;
      next();
    } catch (error) {
      console.error('Erro ao verificar o token', error.message);
      res.status(401).json({ message: 'Token inválido ou expirado' });
    }
  } else {
    console.error('Cabeçalho Authorization não encontrado na requisição');
    res.status(401).json({ message: 'Token não encontrado' });
  }
};