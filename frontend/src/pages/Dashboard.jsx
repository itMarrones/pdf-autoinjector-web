// Dashboard.jsx
// Página principal para el usuario operador.
// Permite subir plantilla PDF y Excel, generar archivos y ver/descargar solo los ZIPs generados por él.

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import AccessDenied from '../components/AccessDenied';
import useAuth from '../hooks/useAuth';
import useZips from '../hooks/useZips';
import useDebounce from '../hooks/useDebounce';

const Dashboard = () => {
  const { user, token, logout, isAuthenticated } = useAuth();
  const { zips, loading, error, fetchZips, deleteZip } = useZips(token);

  // Estado para el buscador de archivos propios
  const [busqueda, setBusqueda] = useState('');
  const filtro = useDebounce(busqueda, 300);

  // Estado para subida de archivos
  const [pdfFile, setPdfFile] = useState(null);
  const [excelFile, setExcelFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  // Filtra los ZIPs para mostrar solo los generados por el usuario actual
  // Suponiendo que el backend asocia el ZIP al usuario (ajusta según tu modelo)
  const misZips = zips.filter(z => z.usuario === user?.usuario)
    .filter(z => z.nom.toLowerCase().includes(filtro.toLowerCase()));

  // Maneja la subida de archivos y generación de ZIP
  const handleGenerar = async (e) => {
    e.preventDefault();
    setUploadError('');
    setUploadSuccess('');
    if (!pdfFile || !excelFile) {
      setUploadError('Debes seleccionar un archivo PDF y un Excel.');
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('pdf', pdfFile);
      formData.append('excel', excelFile);

      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/generar`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setUploadSuccess('Archivos generados correctamente.');
        fetchZips(); // Refresca la lista de ZIPs
      } else {
        setUploadError(data.error || 'Error al generar los archivos.');
      }
    } catch {
      setUploadError('Error de red al generar los archivos.');
    }
    setUploading(false);
  };

  // Si no está autenticado o no es operador, acceso denegado
  if (!isAuthenticated || user?.rol !== 'operador') {
    return <AccessDenied />;
  }

  return (
    <>
      <Header user={user} onLogout={logout} />
      <main className="container mt-5">
        <div className="content-card mb-4">
          <h3 style={{ color: 'var(--corporate-red)' }}>Generar archivos PDF</h3>
          {/* Formulario para subir plantilla PDF y Excel */}
          <form onSubmit={handleGenerar} className="row g-3 align-items-end">
            <div className="col-md-5">
              <label className="form-label">Plantilla PDF</label>
              <input
                type="file"
                className="form-control"
                accept="application/pdf"
                onChange={e => setPdfFile(e.target.files[0])}
                required
              />
            </div>
            <div className="col-md-5">
              <label className="form-label">Archivo Excel</label>
              <input
                type="file"
                className="form-control"
                accept=".xls,.xlsx"
                onChange={e => setExcelFile(e.target.files[0])}
                required
              />
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary w-100" type="submit" disabled={uploading}>
                {uploading ? <Loader text="Generando..." /> : 'Generar'}
              </button>
            </div>
            {uploadError && <Alert type="danger">{uploadError}</Alert>}
            {uploadSuccess && <Alert type="success">{uploadSuccess}</Alert>}
          </form>
        </div>

        <div className="content-card">
          <h4 style={{ color: 'var(--corporate-red)' }}>Mis archivos ZIP generados</h4>
          {/* Buscador */}
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
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {misZips.map(zip => (
                  <tr key={zip.nom}>
                    <td>
                      <input value={zip.nom} readOnly className="form-control" />
                    </td>
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
                {misZips.length === 0 && !loading && (
                  <tr>
                    <td colSpan={2} className="text-center text-muted">
                      No tienes archivos ZIP generados.
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

export default Dashboard;