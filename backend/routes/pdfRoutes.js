const express = require('express');
const router = express.Router();
const upload = require('../utils/uploadConfig'); // Middleware para gestionar la subida de archivos
const pdfController = require('../controllers/pdfController'); // Controlador con la lógica de negocio

// === Ruta para generar PDFs y comprimirlos en un ZIP ===
// Recibe archivos 'excel' y 'pdf', y llama al controlador para procesarlos
router.post('/generar', upload.fields([{ name: 'excel' }, { name: 'pdf' }]), pdfController.generar);

module.exports = router;