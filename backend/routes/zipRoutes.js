// routes/zipRoutes.js
// Define las rutas para listar y eliminar archivos ZIP generados por el sistema.

const express = require('express');
const router = express.Router();
const zipController = require('../controllers/zipController');

// === Ruta para listar todos los ZIPs disponibles ===
// GET /api/zips
router.get('/', zipController.listarZips);

// === Ruta para eliminar un ZIP específico ===
// POST /api/zips/eliminar
router.post('/eliminar', zipController.eliminarZip);

module.exports = router;
