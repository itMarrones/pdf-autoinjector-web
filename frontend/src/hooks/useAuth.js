// useAuth.js
// Hook personalizado para gestionar la autenticación y el usuario actual en la aplicación.

import { useState, useEffect } from 'react';

// Lee el usuario y token del localStorage (si existen)
function getStoredAuth() {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return {
    token,
    user: user ? JSON.parse(user) : null,
  };
}

export default function useAuth() {
  // Estado: usuario y token
  const [user, setUser] = useState(() => getStoredAuth().user);
  const [token, setToken] = useState(() => getStoredAuth().token);

  // Login: guarda usuario y token en el estado y en localStorage
  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  // Logout: borra usuario y token del estado y del localStorage
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Efecto: sincroniza el estado con localStorage si cambia en otra pestaña
  useEffect(() => {
    const syncAuth = () => {
      const { user, token } = getStoredAuth();
      setUser(user);
      setToken(token);
    };
    window.addEventListener('storage', syncAuth);
    return () => window.removeEventListener('storage', syncAuth);
  }, []);

  // Devuelve el estado y las funciones de login/logout
  return {
    isAuthenticated: !!token,
    user,
    token,
    login,
    logout,
  };
}