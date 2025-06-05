// Login.jsx
// Página de inicio de sesión para la aplicación PDF AutoInjector Web.
// Permite al usuario autenticarse introduciendo su usuario y contraseña.
// Muestra mensajes de error si las credenciales son incorrectas o hay problemas de conexión.

import React, { useState } from 'react';
import { login } from '../utils/api';      // Función para hacer login contra la API
import logo from '../assets/logo.png';     // Logo corporativo

// Props:
// - onLogin: función a ejecutar tras login exitoso (recibe los datos del usuario)
const Login = ({ onLogin }) => {
  // Estado para los campos del formulario y el mensaje de error
  const [usuario, setUsuario] = useState('');
  const [contrasenya, setContrasenya] = useState('');
  const [error, setError] = useState('');

  // Maneja el envío del formulario de login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Llama a la API de login
      const data = await login(usuario, contrasenya);
      if (data.success) {
        // Si el login es correcto, llama a la función onLogin (ej: guarda usuario y redirige)
        onLogin(data);
      } else {
        // Si hay error de credenciales, muestra el mensaje
        setError(data.error);
      }
    } catch {
      // Si hay error de red, muestra mensaje genérico
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      {/* Logo de la empresa */}
      <img src={logo} alt="Logo Marrones" style={{ height: 50, marginBottom: 16 }} />
      <div className="content-card p-4 rounded shadow" style={{ maxWidth: 400, width: '100%' }}>
        <h4 className="text-center mb-3 text-danger">Iniciar sesión</h4>
        {/* Formulario de login */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              value={usuario}
              onChange={e => setUsuario(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={contrasenya}
              onChange={e => setContrasenya(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary w-100" type="submit">Entrar</button>
          {/* Mensaje de error si existe */}
          {error && <div className="text-danger text-center mt-3">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;