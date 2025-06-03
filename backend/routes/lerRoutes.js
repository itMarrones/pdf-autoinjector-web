// routes/lerRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');
const { PDFDocument } = require('pdf-lib');
const { authRequired } = require('../middleware/authMiddleware');

// Configurar almacenamiento para subida de archivos
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
  })
});

// Ruta para actualizar campos LER en un PDF base desde Excel
router.post('/ler', authRequired, upload.fields([{ name: 'excel' }, { name: 'pdf' }]), async (req, res) => {
  try {
    const excelPath = req.files.excel[0].path;
    const pdfTemplatePath = req.files.pdf[0].path;

    // Leer Excel
    const workbook = XLSX.readFile(excelPath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const row = XLSX.utils.sheet_to_json(sheet)[0]; // solo la primera fila

    // Leer plantilla PDF
    const pdfBytes = fs.readFileSync(pdfTemplatePath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();

    // Insertar los datos del Excel en campos del PDF
    for (const key in row) {
      try {
        const field = form.getFieldMaybe(key);
        if (field) field.setText(String(row[key]));
      } catch (err) {
        console.warn(`Campo no encontrado: ${key}`);
      }
    }

    const outputPath = path.join(__dirname, '..', 'generated', `LER_actualizado_${Date.now()}.pdf`);
    const finalPdf = await pdfDoc.save();
    fs.writeFileSync(outputPath, finalPdf);

    // Enviar URL para descargar
    const downloadUrl = `/downloads/${path.basename(outputPath)}`;
    res.json({ success: true, downloadUrl });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;