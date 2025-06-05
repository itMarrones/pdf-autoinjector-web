// index.js
// Punto de entrada del backend: configura el servidor, rutas y tareas automáticas.

require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration');
const eliminarZipsAntics = require('./utils/limpiarZips');

// === Importar rutas principales ===
const lerRoutes = require('./routes/lerRoutes');
const zipRoutes = require('./routes/zipRoutes');
const usuariRoutes = require('./routes/usuarioRoutes');
const pdfRoutes = require('./routes/pdfRoutes');

const app = express();
const PORT = 4000;
dayjs.extend(duration);

// === Middlewares globales ===
app.use(cors());
app.use(express.json());
app.use('/downloads', express.static(path.join(__dirname, 'generated')));

// === Rutas principales ===
app.use('/api/usuario', usuariRoutes);
app.use('/api/zips', zipRoutes);
app.use('/api', lerRoutes);
app.use('/api', pdfRoutes);

// === Arranque del servidor ===
app.listen(PORT, () => {
  console.log(`✅ Backend escuchando en el puerto ${PORT}`);
});

// === Limpieza de zips y carpetas antiguas cada 24h ===
setInterval(() => {
  console.log('🧹 Ejecutando limpieza de ZIPs y carpetas antiguas...');
  eliminarZipsAntics();
}, 86400000); // 24 horas en milisegundos

// === Limpieza inicial al arrancar el servidor ===
eliminarZipsAntics();
