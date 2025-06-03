// backend/index.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');
const { PDFDocument } = require('pdf-lib');
const archiver = require('archiver');
const cors = require('cors');
const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration');
const eliminarZipsAntics = require('./utils/limpiarZips');
const lerRoutes = require('./routes/lerRoutes');
const zipRoutes = require('./routes/zipRoutes');
const usuariRoutes = require('./routes/usuarioRoutes');
const { authRequired, onlyAdmin } = require('./middleware/authMiddleware');

const app = express();
const PORT = 4000;
dayjs.extend(duration);

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use('/downloads', express.static(path.join(__dirname, 'generated')));

// Rutas principales
app.use('/api/usuario', usuariRoutes);
app.use('/api/zips', zipRoutes);
app.use('/api', lerRoutes);

// Configuración de subida de archivos
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, 'uploads')),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
  })
});

// Ruta principal: Generar PDFs por fila de Excel
app.post('/api/generar', upload.fields([{ name: 'excel' }, { name: 'pdf' }]), async (req, res) => {
  try {
    const excelPath = req.files.excel[0].path;
    const pdfTemplatePath = req.files.pdf[0].path;

    const workbook = XLSX.readFile(excelPath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    const timestamp = dayjs().format('YYYY-MM-DD_HHmm');
    const outputFolder = path.join(__dirname, 'generated', timestamp);
    fs.mkdirSync(outputFolder, { recursive: true });

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const pdfBytes = fs.readFileSync(pdfTemplatePath);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const form = pdfDoc.getForm();

      for (const key in row) {
        try {
          const field = form.getFieldMaybe(key);
          if (field) field.setText(String(row[key]));
        } catch {}
      }

      const outputPath = path.join(outputFolder, `productor_${i + 1}.pdf`);
      const finalPdf = await pdfDoc.save();
      fs.writeFileSync(outputPath, finalPdf);
    }

    const zipName = `pdfs_${timestamp}.zip`;
    const zipPath = path.join(__dirname, 'generated', zipName);
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.pipe(output);
    archive.directory(outputFolder, false);
    archive.finalize();

    output.on('close', () => {
      return res.json({ success: true, downloadUrl: `/downloads/${zipName}` });
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Arranque del servidor
app.listen(PORT, () => {
  console.log(`✅ Backend escuchando en el puerto ${PORT}`);
});

// Limpieza de zips y carpetas antiguas cada 24h
setInterval(() => {
  console.log('🧹 Ejecutando limpieza de ZIPs y carpetas antiguas...');
  eliminarZipsAntics();
}, 86400000);

eliminarZipsAntics();
