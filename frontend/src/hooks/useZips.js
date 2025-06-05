// useZips.js
// Hook personalizado para gestionar la obtención y manipulación de archivos ZIP desde la API.
// Usa la URL base definida en el .env (REACT_APP_API_BASE_URL) para mayor seguridad y flexibilidad.

import { useState, useEffect } from 'react';

// Lee la URL base de la API desde las variables de entorno (seguridad y portabilidad)
const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/zips`;

// Hook principal
export default function useZips(token) {
  const [zips, setZips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para obtener la lista de ZIPs
  const fetchZips = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setZips(data.zips);
      else setError(data.error || "Error al obtener los ZIPs");
    } catch (err) {
      setError("Error de red");
    }
    setLoading(false);
  };

  // Función para eliminar un ZIP por nombre
  const deleteZip = async (nom) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/eliminar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ nom })
      });
      const data = await res.json();
      if (data.success) {
        setZips(zips => zips.filter(z => z.nom !== nom));
      } else {
        setError(data.error || "No se pudo eliminar el ZIP");
      }
    } catch (err) {
      setError("Error de red");
    }
    setLoading(false);
  };

  // Cargar ZIPs al montar el hook o cuando cambie el token
  useEffect(() => {
    if (token) fetchZips();
    // eslint-disable-next-line
  }, [token]);

  // Devuelve el estado y las funciones
  return { zips, loading, error, fetchZips, deleteZip };
}