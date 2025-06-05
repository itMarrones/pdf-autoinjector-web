// Loader.jsx
// Componente reutilizable para mostrar un spinner de carga centrado.
// Props opcionales: text (mensaje opcional debajo del spinner)

import React from 'react';

const Loader = ({ text }) => (
  <div className="d-flex flex-column align-items-center justify-content-center py-4">
    <div className="spinner-border text-danger" role="status" style={{ width: 48, height: 48 }}>
      <span className="visually-hidden">Cargando...</span>
    </div>
    {text && <div className="mt-2 text-muted">{text}</div>}
  </div>
);

export default Loader;