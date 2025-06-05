// routes/lerRoutes.js
// Define la ruta para actualizar los códigos LER a partir de un archivo Excel subido por el usuario.

const express = require('express');
const router = express.Router();
const upload = require('../utils/uploadConfig'); // Middleware para gestionar la subida de archivos
const lerController = require('../controllers/lerController'); // Controlador con la lógica de negocio

// === Ruta para actualizar los códigos LER ===
// Recibe un archivo Excel en el campo 'excel' y llama al controlador para procesarlo
router.post('/ler', upload.fields([{ name: 'excel' }]), lerController.actualizarLER);

module.exports = router;