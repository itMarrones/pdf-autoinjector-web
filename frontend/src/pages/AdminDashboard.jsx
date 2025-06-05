// AdminDashboard.jsx
// Página principal para el usuario administrador.
// Permite ver, buscar, descargar y eliminar todos los archivos ZIP generados en el sistema.

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import AccessDenied from '../components/AccessDenied';
import useAuth from '../hooks/useAuth';
import useZips from '../hooks/useZips';
import useDebounce from '../hooks/useDebounce';

const AdminDashboard = () => {
  const { user, token, logout, isAuthenticated } = useAuth();
  const { zips, loading, error, fetchZips, deleteZip } = useZips(token);

  // Estado para el buscador global
  const [busqueda, setBusqueda] = useState('');
  const filtro = useDebounce(busqueda, 300);

  // Filtra los ZIPs según el texto del buscador (busca en el nombre)
  const zipsFiltrados = zips.filter(z =>
    z.nom.toLowerCase().includes(filtro.toLowerCase())
  );

  // Si no está autenticado o no es admin, acceso denegado
  if (!isAuthenticated || user?.rol !== 'admin') {
    return <AccessDenied />;
  }

  return (
    <>
      <Header user={user} onLogout={logout} />
      <main className="container mt-5">
        <div className="content-card">
          <h3 style={{ color: 'var(--corporate-red)' }}>Archivos ZIP generados (historial completo)</h3>
          {/* Buscador global */}
          <input
            type="text"
            className="form-control my-3"
            placeholder="Buscar archivo zip..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
          {/* Mensaje de error */}
          {error && <Alert type="danger">{error}</Alert>}
          {/* Loader mientras carga */}
          {loading && <Loader text="Cargando archivos ZIP..." />}
          {/* Tabla de ZIPs */}
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nombre del archivo</th>
                  <th>Usuario</th>
                  <th>Fecha de creación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {zipsFiltrados.map(zip => (
                  <tr key={zip.nom}>
                    <td>
                      <input value={zip.nom} readOnly className="form-control" />
                    </td>
                    <td>{zip.usuario || 'Desconocido'}</td>
                    <td>{zip.fecha ? new Date(zip.fecha).toLocaleString() : 'Sin fecha'}</td>
                    <td className="d-flex gap-2">
                      <a
                        href={`/downloads/${zip.nom}`}
                        className="btn btn-sm btn-outline-secondary"
                        download
                        title="Descargar ZIP"
                      >
                        <i className="bi bi-download"></i>
                      </a>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => {
                          if (window.confirm("¿Estás seguro de que quieres eliminar este archivo?")) {
                            deleteZip(zip.nom);
                          }
                        }}
                        title="Eliminar ZIP"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {zipsFiltrados.length === 0 && !loading && (
                  <tr>
                    <td colSpan={4} className="text-center text-muted">
                      No hay archivos ZIP que coincidan con la búsqueda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminDashboard;