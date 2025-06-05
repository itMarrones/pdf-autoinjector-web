// services/pdfService.js
// Servicio para generar PDFs a partir de un Excel y una plantilla PDF, y comprimirlos en un ZIP.

const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const { PDFDocument } = require('pdf-lib');
const archiver = require('archiver');
const dayjs = require('dayjs');

async function generarPDFsYZip(excelPath, pdfTemplatePath) {
  // === 1. Leer y procesar el archivo Excel ===
  // Convierte cada fila del Excel en un objeto JS
  const workbook = XLSX.readFile(excelPath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet);

  // === 2. Crear carpeta de salida temporal para los PDFs ===
  const timestamp = dayjs().format('YYYY-MM-DD_HHmm');
  const outputFolder = path.join(__dirname, '..', 'generated', timestamp);
  fs.mkdirSync(outputFolder, { recursive: true });

  // === 3. Generar un PDF por cada fila del Excel ===
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const pdfBytes = fs.readFileSync(pdfTemplatePath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();

    // Rellenar los campos del PDF con los datos de la fila
    for (const key in row) {
      try {
        const field = form.getFieldMaybe(key);
        if (field) field.setText(String(row[key]));
      } catch {}
    }

    // Guardar el PDF generado en la carpeta temporal
    const outputPath = path.join(outputFolder, `productor_${i + 1}.pdf`);
    const finalPdf = await pdfDoc.save();
    fs.writeFileSync(outputPath, finalPdf);
  }

  // === 4. Comprimir todos los PDFs en un ZIP ===
  const zipName = `pdfs_${timestamp}.zip`;
  const zipPath = path.join(__dirname, '..', 'generated', zipName);
  await new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.pipe(output);
    archive.directory(outputFolder, false);
    archive.finalize();

    output.on('close', resolve);
    archive.on('error', reject);
  });

  // === 5. Devolver el nombre del ZIP generado ===
  return { zipName };
}

module.exports = { generarPDFsYZip };