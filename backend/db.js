// db.js
// Configura y exporta un pool de conexiones a la base de datos MySQL usando mysql2/promise.

const mysql = require('mysql2/promise');

// === Crear un pool de conexiones a la base de datos MySQL ===
// Usa variables de entorno para la configuración y valores por defecto si no existen
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// === Exportar el pool para usarlo en otros módulos ===
module.exports = pool;
