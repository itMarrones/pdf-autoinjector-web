// Alert.jsx
// Componente reutilizable para mostrar mensajes de éxito, error o información.
// Props:
// - type: 'success' | 'danger' | 'warning' | 'info' (Bootstrap)
// - children: contenido del mensaje
// - onClose: función opcional para cerrar el alert

import React from 'react';

const Alert = ({ type = 'info', children, onClose }) => (
  <div className={`alert alert-${type} d-flex align-items-center`} role="alert">
    <div className="flex-grow-1">{children}</div>
    {onClose && (
      <button type="button" className="btn-close ms-2" aria-label="Cerrar" onClick={onClose}></button>
    )}
  </div>
);

export default Alert;