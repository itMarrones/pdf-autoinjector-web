const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { authRequired, onlyAdmin } = require('../middleware/authMiddleware');

// Carpeta donde se guardan los archivos ZIP generados
const ZIP_FOLDER = path.join(__dirname, '..', 'generated');

// Ruta protegida: listado de ZIPs (ya definida en index.js)
// Esta ruta no se implementa aquí directamente para evitar duplicidad
router.get('/', authRequired, onlyAdmin, async (req, res) => {
  // (implementación ya gestionada en index.js)
});

// Ruta: Eliminar un archivo ZIP
router.delete('/:nom', authRequired, onlyAdmin, (req, res) => {
  const zipPath = path.join(ZIP_FOLDER, req.params.nom);

  // Si el archivo existe, lo eliminamos
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
    return res.json({ success: true });
  } else {
    return res.status(404).json({ success: false, error: 'Archivo no encontrado' });
  }
});

// Ruta: Renombrar un archivo ZIP
router.put('/:nom', authRequired, onlyAdmin, (req, res) => {
  const nuevoNombre = req.body.nouNom;
  if (!nuevoNombre) {
    return res.status(400).json({ success: false, error: 'Se requiere un nuevo nombre' });
  }

  const origen = path.join(ZIP_FOLDER, req.params.nom);
  const destino = path.join(ZIP_FOLDER, nuevoNombre);

  if (!fs.existsSync(origen)) {
    return res.status(404).json({ success: false, error: 'Archivo original no encontrado' });
  }

  fs.renameSync(origen, destino);
  res.json({ success: true });
});

// Ruta: Descargar un archivo ZIP
router.get('/download/:nom', authRequired, onlyAdmin, (req, res) => {
  const file = path.join(ZIP_FOLDER, req.params.nom);

  if (fs.existsSync(file)) {
    res.download(file); // Envía el archivo como descarga al navegador
  } else {
    res.status(404).json({ success: false, error: 'Archivo no encontrado' });
  }
});

module.exports = router;
