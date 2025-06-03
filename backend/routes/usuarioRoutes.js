const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarioController');

// Ruta de login: POST /api/usuario/login
// Llama al controlador que gestiona la autenticación del usuario
router.post('/login', controller.login);

module.exports = router;
