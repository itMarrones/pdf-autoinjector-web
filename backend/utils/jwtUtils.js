// utils/jwtUtils.js
// Utilidad para generar y verificar tokens JWT usando la clave secreta del entorno.

const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

// === Generar un token JWT ===
// Recibe un payload (datos del usuario) y un tiempo de expiración opcional (por defecto 2 horas)
exports.generateToken = (payload, expiresIn = '2h') =>
  jwt.sign(payload, secretKey, { expiresIn });

// === Verificar un token JWT ===
// Recibe un token y lo verifica usando la clave secreta
exports.verifyToken = (token) =>
  jwt.verify(token, secretKey);