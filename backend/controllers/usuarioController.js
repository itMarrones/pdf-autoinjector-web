const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

// Clave secreta para firmar los tokens JWT (mejor usar variable de entorno)
const secretKey = 'pASsW0rD123!';

// Controlador para el login de usuario
exports.login = async (req, res) => {
  const { email, contrasenya } = req.body; // Extrae los datos del cuerpo de la solicitud

  try {
    // Busca el usuario en la base de datos por email
    const [rows] = await pool.execute('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ success: false, error: 'Usuario no encontrado' });
    }

    const usuario = rows[0];

    // Compara la contraseña introducida con la almacenada en la base de datos
    const esCorrecta = await bcrypt.compare(contrasenya, usuario.contrasenya);
    if (!esCorrecta) {
      return res.status(401).json({ success: false, error: 'Contraseña incorrecta' });
    }

    // Genera un token JWT con la información del usuario (válido por 2 horas)
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol: usuario.rol },
      secretKey,
      { expiresIn: '2h' }
    );

    // Devuelve una respuesta con el token, nombre y rol del usuario
    res.json({
      success: true,
      token,
      nom: usuario.nom,
      rol: usuario.rol
    });

  } catch (err) {
    // Captura errores y responde con mensaje de error
    res.status(500).json({ success: false, error: err.message });
  }
};