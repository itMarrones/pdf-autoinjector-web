// Este controlador gestiona la visualización y eliminación de archivos ZIP generados por el sistema.
// Permite listar todos los ZIPs disponibles en la carpeta 'generated' y eliminar un ZIP específico.

const path = require('path');
const fs = require('fs');

const GENERATED_DIR = path.join(__dirname, '..', 'generated');

// Controlador para listar todos los archivos ZIP disponibles
exports.listarZips = (req, res) => {
  try {
    // === 1. Leer archivos ZIP de la carpeta 'generated' ===
    // Filtra solo los archivos que terminan en .zip y obtiene su fecha de modificación
    const files = fs.readdirSync(GENERATED_DIR)
      .filter(f => f.endsWith('.zip'))
      .map(f => ({
        nom: f,
        fecha: fs.statSync(path.join(GENERATED_DIR, f)).mtime
      }));

    // === 2. Responder con la lista de ZIPs ===
    res.json({ success: true, zips: files });
  } catch (err) {
    // === 3. Manejo de errores ===
    res.status(500).json({ success: false, error: err.message });
  }
};

// Controlador para eliminar un archivo ZIP específico
exports.eliminarZip = (req, res) => {
  // === 1. Obtener el nombre del archivo a eliminar del cuerpo de la petición ===
  const { nom } = req.body;
  const filePath = path.join(GENERATED_DIR, nom);

  try {
    // === 2. Comprobar si el archivo existe y eliminarlo ===
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      // === 3. Responder con éxito ===
      res.json({ success: true });
    } else {
      // === 4. Archivo no encontrado ===
      res.status(404).json({ success: false, error: 'Archivo no encontrado' });
    }
  } catch (err) {
    // === 5. Manejo de errores ===
    res.status(500).json({ success: false, error: err.message });
  }
};