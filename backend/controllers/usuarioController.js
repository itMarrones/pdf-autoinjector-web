// Este controlador gestiona el inicio de sesión de los usuarios.
// Recibe las credenciales, valida el usuario y la contraseña,
// genera un token JWT si son correctos y responde con los datos necesarios para el frontend.

require('dotenv').config();
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwtUtils');
const { findUserByEmail, findUserByUsuario } = require('../services/userService');

// Controlador para el login de usuario
exports.login = async (req, res) => {
  // === 1. Extraer datos del cuerpo de la solicitud ===
  const { usuario, contrasenya } = req.body;

  try {
    // === 2. Buscar usuario por nombre de usuario ===
    const user = await findUserByUsuario(usuario);

    // === 3. Validar existencia del usuario ===
    if (!user) return res.status(401).json({ success: false, error: 'Usuario no encontrado' });

    // === 4. Validar contraseña ===
    // Compara la contraseña introducida con la almacenada en la base de datos
    const esCorrecta = await bcrypt.compare(contrasenya, user.contrasenya);
    if (!esCorrecta) return res.status(401).json({ success: false, error: 'Contraseña incorrecta' });

    // === 5. Generar token JWT ===
    // Genera un token JWT con la información del usuario (válido por 2 horas)
    const token = generateToken(
      { id: user.id, email: user.email, rol: user.rol }
    );

    // === 6. Responder con los datos del usuario y el token ===
    res.json({
      success: true,
      token,
      nom: user.nom,
      rol: user.rol
    });
  } catch (err) {
    // === 7. Manejo de errores ===
    // Captura errores y responde con mensaje de error
    res.status(500).json({ success: false, error: err.message });
  }
};