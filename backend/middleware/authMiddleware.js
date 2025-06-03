const jwt = require('jsonwebtoken');
const secretKey = 'pASsW0rD123!'; // Clave secreta para firmar/verificar tokens JWT

// Middleware para verificar si el usuario envió un token válido
exports.authRequired = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Si no hay token en el encabezado o el formato no es Bearer, denegamos acceso
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Token no proporcionado' });
  }

  // Extraemos el token del encabezado
  const token = authHeader.split(' ')[1];

  try {
    // Verificamos el token y lo decodificamos
    const userData = jwt.verify(token, secretKey);
    req.user = userData; // Guardamos los datos del usuario en la request
    next(); // Continuamos con la siguiente función middleware o ruta
  } catch (err) {
    // Si el token es inválido o ha caducado
    return res.status(403).json({ success: false, error: 'Token inválido o caducado' });
  }
};

// Middleware para permitir solo a usuarios con rol "admin"
exports.onlyAdmin = (req, res, next) => {
  if (req.user.rol !== 'admin') {
    return res.status(403).json({ success: false, error: 'Acceso denegado: solo para administradores' });
  }
  next(); // El usuario es admin, puede continuar
};