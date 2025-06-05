// AccessDenied.jsx
// Componente reutilizable para mostrar un mensaje de acceso denegado.

import React from 'react';

const AccessDenied = () => (
  <div className="container py-5 text-center">
    <h2 className="text-danger mb-3">Acceso denegado</h2>
    <p>No tienes permisos para ver esta página.</p>
  </div>
);

export default AccessDenied;