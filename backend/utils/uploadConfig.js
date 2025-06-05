// utils/uploadConfig.js
// Configuración de multer para gestionar la subida de archivos al servidor.

const multer = require('multer');
const path = require('path');

// === Configuración del almacenamiento ===
// Define la carpeta de destino y el formato del nombre de los archivos subidos
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
  })
});

module.exports = upload;