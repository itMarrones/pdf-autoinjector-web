// Header.jsx
// Componente de cabecera para la aplicación PDF AutoInjector Web.
// Muestra el logo, el selector de tema (claro/oscuro) y un menú de usuario con opción de cerrar sesión.
// Es reutilizable en todas las páginas principales del frontend.

import React from 'react';
import logo from '../assets/logo.png';      // Logo corporativo
import ThemeToggle from './ThemeToggle';   // Componente para alternar tema claro/oscuro

// Props:
// - user: objeto con los datos del usuario autenticado (incluye el rol)
// - onLogout: función a ejecutar al pulsar "Cerrar sesión"
const Header = ({ user, onLogout }) => (
  <header className="d-flex justify-content-between align-items-center p-3 border-bottom">
    {/* Logo de la empresa */}
    <img src={logo} alt="Logo Marrones" style={{ height: 50 }} />

    {/* Controles de usuario: selector de tema y menú de usuario */}
    <div className="d-flex align-items-center gap-3">
      {/* Botón para alternar entre modo claro y oscuro */}
      <ThemeToggle />

      {/* Menú desplegable de usuario */}
      <div className="dropdown">
        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
          {/* Muestra el rol del usuario */}
          {user?.rol === 'admin' ? 'Administrador' : 'Operador'}
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            {/* Opción para cerrar sesión */}
            <button className="dropdown-item" onClick={onLogout}>
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  </header>
);

export default Header;