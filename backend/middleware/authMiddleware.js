// Este middleware protege rutas verificando el token JWT enviado por el usuario.
// También permite restringir el acceso solo a usuarios con rol "admin".

require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET; // Clave secreta para firmar/verificar tokens JWT

// Middleware para verificar si el usuario envió un token válido
exports.authRequired = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // === 1. Comprobar si el token está presente y tiene el formato correcto ===
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Token no proporcionado' });
  }

  // === 2. Extraer el token del encabezado ===
  const token = authHeader.split(' ')[1];

  try {
    // === 3. Verificar y decodificar el token ===
    const userData = jwt.verify(token, jwtSecret);
    req.user = userData; // Guardar los datos del usuario en la request para su uso posterior
    next(); // Continuar con la siguiente función middleware o ruta
  } catch (err) {
    // === 4. Manejo de errores de autenticación ===
    return res.status(403).json({ success: false, error: 'Token inválido o caducado' });
  }
};

// Middleware para permitir solo a usuarios con rol "admin"
exports.onlyAdmin = (req, res, next) => {
  // === 1. Comprobar el rol del usuario ===
  if (req.user.rol !== 'admin') {
    return res.status(403).json({ success: false, error: 'Acceso denegado: solo para administradores' });
  }
  next(); // El usuario es admin, puede continuar
};