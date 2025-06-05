// useFetch.js
// Hook genérico para peticiones HTTP (GET, POST, etc.)
// Útil para centralizar la gestión de loading y error en llamadas a la API.

import { useState } from 'react';

export default function useFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para hacer peticiones
  const request = async (url, options = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, options);
      const data = await res.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError('Error de red');
      setLoading(false);
      return null;
    }
  };

  return { loading, error, request };
}