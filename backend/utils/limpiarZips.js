const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');

// Ruta de la carpeta donde se guardan los ZIPs y carpetas generadas
const carpeta = path.join(__dirname, '..', 'generated');
const MAX_DIAS = 15; // Máximo de días antes de eliminar archivos

function eliminarZipsAntiguos() {
  const ahora = dayjs();

  // Si la carpeta no existe, salimos
  if (!fs.existsSync(carpeta)) return;

  const archivos = fs.readdirSync(carpeta);

  archivos.forEach(nombre => {
    const ruta = path.join(carpeta, nombre);
    const stats = fs.statSync(ruta);
    const fechaCreacion = dayjs(stats.birthtime);
    const diasPasados = ahora.diff(fechaCreacion, 'day');

    if (diasPasados > MAX_DIAS) {
      // Si es un archivo ZIP, lo eliminamos
      if (nombre.endsWith('.zip')) {
        fs.unlinkSync(ruta);
        console.log(`ZIP eliminado: ${nombre}`);
      }

      // Si es una carpeta, la eliminamos también
      const rutaCompleta = path.join(carpeta, nombre);
      if (fs.statSync(rutaCompleta).isDirectory()) {
        fs.rmSync(rutaCompleta, { recursive: true, force: true });
        console.log(`Carpeta temporal eliminada: ${nombre}`);
      }
    }
  });
}

module.exports = eliminarZipsAntiguos;
