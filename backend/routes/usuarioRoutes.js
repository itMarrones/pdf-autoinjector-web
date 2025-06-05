const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Ruta de login: POST /api/usuario/login
// Llama al controlador que gestiona la autenticación del usuario
router.post('/login', usuarioController.login);

module.exports = router;
