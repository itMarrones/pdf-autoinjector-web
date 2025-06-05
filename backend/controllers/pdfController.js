// Este controlador recibe un archivo Excel y una plantilla PDF subidos por el usuario.
// Genera un PDF por cada fila del Excel usando la plantilla, los comprime en un ZIP
// y devuelve la URL de descarga al cliente.

const { generarPDFsYZip } = require('../services/pdfService');

exports.generar = async (req, res) => {
  try {
    // === 1. Obtener rutas de los archivos subidos ===
    // Extrae las rutas del archivo Excel y la plantilla PDF del request
    const excelPath = req.files.excel[0].path;
    const pdfTemplatePath = req.files.pdf[0].path;

    // === 2. Generar PDFs y comprimir en ZIP ===
    // Llama al servicio que genera los PDFs y el ZIP a partir de los archivos subidos
    const { zipName } = await generarPDFsYZip(excelPath, pdfTemplatePath);

    // === 3. Responder con la URL de descarga ===
    // Devuelve al frontend la URL para descargar el ZIP generado
    return res.json({ success: true, downloadUrl: `/downloads/${zipName}` });
  } catch (err) {
    // === 4. Manejo de errores ===
    // Si ocurre un error, responde con un mensaje de error
    res.status(500).json({ success: false, error: err.message });
  }
};