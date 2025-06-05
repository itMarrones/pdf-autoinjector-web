// ProtectedRoute.jsx
// Componente para proteger rutas según autenticación y/o rol.
// Props:
// - isAuthenticated: booleano, si el usuario está autenticado
// - allowedRoles: array opcional de roles permitidos (ej: ['admin'])
// - user: objeto usuario (debe tener .rol)
// - children: contenido a renderizar si tiene acceso

import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente de acceso denegado
export const AccessDenied = () => (
  <div className="container py-5 text-center">
    <h2 className="text-danger mb-3">Acceso denegado</h2>
    <p>No tienes permisos para ver esta página.</p>
  </div>
);

const ProtectedRoute = ({ isAuthenticated, allowedRoles, user, children }) => {
  // Si no está autenticado, redirige a login
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  // Si hay restricción de roles y el usuario no tiene el rol, muestra acceso denegado
  if (allowedRoles && !allowedRoles.includes(user?.rol)) return <AccessDenied />;
  // Si pasa las comprobaciones, renderiza el contenido protegido
  return children;
};

export default ProtectedRoute;