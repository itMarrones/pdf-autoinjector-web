const mysql = require('mysql2/promise');

// Crear una conexión a la base de datos MySQL
// Se usan variables de entorno si están definidas, o valores por defecto
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',     // Dirección del servidor MySQL
  user: process.env.DB_USER || 'root',          // Usuario de la base de datos
  password: process.env.DB_PASSWORD || 'root',  // Contraseña del usuario
  database: process.env.DB_NAME || 'pdfauto'    // Nombre de la base de datos
});

module.exports = db; // Exportamos la conexión para usarla en otros módulos
