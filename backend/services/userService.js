// Servicio para buscar usuarios en la base de datos por email o por nombre de usuario.

const pool = require('../db');

// === Buscar usuario por email ===
// Devuelve el primer usuario que coincida con el email proporcionado
exports.findUserByEmail = async (email) => {
  const [rows] = await pool.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
  return rows[0];
};

// === Buscar usuario por nombre de usuario ===
// Devuelve el primer usuario que coincida con el nombre de usuario proporcionado
exports.findUserByUsuario = async (usuario) => {
  const [rows] = await pool.execute('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
  return rows[0];
};