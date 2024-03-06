let express = require('express');
let router = express.Router();

const verifyToken = require('../middlewares/auth.js');
const clientes = require('../controllers/clienteController.js');
const usuarios = require('../controllers/usuarioController.js');
const funcionarios = require('../controllers/funcionarioController.js');

router.post('/api/cliente', verifyToken, clientes.createCliente);
router.get('/api/cliente/:id', verifyToken, clientes.getCliente);
router.get('/api/clientes',verifyToken, clientes.clientes);
router.put('/api/cliente', verifyToken, clientes.updateCliente);
router.delete('/api/cliente/:id', verifyToken, clientes.deleteCliente);

router.post('/api/usuario', usuarios.createUsuario);
router.delete('/api/usuario/:id',verifyToken, usuarios.deleteUsuario);
router.put('/api/usuario',verifyToken, usuarios.updateUsuario);
router.get('/api/usuarios',verifyToken, usuarios.usuarios);
router.get('/api/usuario/:id', verifyToken, usuarios.getUsuario);
router.post('/api/usuario/modify/:id', verifyToken, usuarios.modifyPassword);
router.post('/api/usuario/login', usuarios.loginUsuario);

router.post('/api/funcionario',verifyToken, funcionarios.createFuncionario);
router.get('/api/funcionario/:id',verifyToken, funcionarios.getFuncionario);
router.get('/api/funcionarios',verifyToken, funcionarios.funcionarios);
router.delete('/api/funcionario/:id',verifyToken, funcionarios.deleteFuncionarios);
router.put('/api/funcionario',verifyToken, funcionarios.updateFuncionario);

module.exports = router;
