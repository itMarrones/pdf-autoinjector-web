// useTheme.js
// Hook personalizado para gestionar el estado del tema claro/oscuro y sincronizarlo con localStorage.

import { useState, useEffect } from 'react';

export default function useTheme() {
  // Estado: true si es modo oscuro, false si es claro
  const [darkMode, setDarkMode] = useState(() => {
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