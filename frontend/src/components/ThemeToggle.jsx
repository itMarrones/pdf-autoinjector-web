// ThemeToggle.jsx
// Componente para alternar entre modo claro y oscuro en la aplicación.
// Usa Bootstrap Icons para mostrar el icono correspondiente y guarda la preferencia en localStorage.

import React, { useEffect, useState } from 'react';

// Hook para manejar el estado del tema y sincronizarlo con localStorage
function useTheme() {
  // Estado: true si es modo oscuro, false si es claro
  const [darkMode, setDarkMode] = useState(() => {
    // Lee la preferencia del usuario desde localStorage al cargar
    return localStorage.getItem('darkMode') === 'true';
  });

  // Efecto: aplica la clase al body y guarda la preferencia cada vez que cambia el estado
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Devuelve el estado y la función para cambiarlo
  return [darkMode, setDarkMode];
}

// Componente visual
const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useTheme();

  // Alterna el estado del tema al hacer clic
  const handleToggle = () => setDarkMode(d => !d);

  return (
    <button
      className="btn btn-link p-0 theme-toggle"
      title={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      onClick={handleToggle}
      style={{ fontSize: 22 }}
    >
      {/* Icono de Bootstrap: luna para claro, sol para oscuro */}
      <i className={darkMode ? "bi bi-sun" : "bi bi-moon"}></i>
    </button>
  );
};

export default ThemeToggle;