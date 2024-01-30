let express = require('express');
let router = express.Router();

const clientes = require('../controllers/clienteController.js');
const usuarios = require('../controllers/usuarioController.js');

router.post('/api/cliente', clientes.createCliente);
router.get('/api/cliente/:id', clientes.getCliente);
router.get('/api/clientes', clientes.clientes);
//router.put('/api/cliente', clientes.updateCliente);
router.delete('/api/cliente/:id', clientes.deleteCliente);

router.post('/api/usuario', usuarios.createUsuario);
router.delete('/api/usuario/:id', usuarios.deleteUsuario);
router.put('/api/usuario', usuarios.updateUsuario);
router.get('/api/usuarios', usuarios.usuarios);
router.post('/api/usuario/modify-password', usuarios.modifyPassword)

module.exports = router;
