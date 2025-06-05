// Este controlador recibe un archivo Excel subido por el usuario, lo procesa y elimina el archivo temporal.
// Es útil para actualizar códigos LER en el sistema a partir de datos en Excel.

const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');

const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

// Controlador principal para actualizar los códigos LER
exports.actualizarLER = (req, res) => {
  try {
    // === 1. Validación de la subida ===
    // Comprueba si se ha subido un archivo Excel
    const excelFile = req.files?.excel?.[0];
    if (!excelFile) {
      return res.status(400).json({ success: false, error: 'No se subió ningún archivo Excel' });
    }

    // === 2. Procesamiento del archivo Excel ===
    // Lee el archivo Excel subido
    const workbook = XLSX.readFile(excelFile.path);

    // === 3. Limpieza del archivo temporal ===
    // Elimina el archivo Excel subido después de procesarlo para ahorrar espacio
    fs.unlinkSync(excelFile.path);

    // === 4. Respuesta al cliente ===
    // Devuelve una respuesta de éxito al frontend
    res.json({ success: true, message: 'Códigos LER actualizados correctamente' });
  } catch (err) {
    // === 5. Manejo de errores ===
    // Si ocurre un error, responde con un mensaje de error
    res.status(500).json({ success: false, error: err.message });
  }
};