// admin-dashboard.js

const tbody = document.getElementById('zipTableBody');
const buscador = document.getElementById('buscador');
const API = 'http://10.254.10.140:4000/api/zips';
const token = localStorage.getItem('token');

let zips = []; // Lista de ZIPs obtenidos del backend
let currentPage = 1;
const itemsPerPage = 10; // Número de elementos por página

// Redirige al login si no hay token o el usuario no es admin
if (!token || localStorage.getItem('rol') !== 'admin') {
  window.location.href = 'login.html';
}

// Carga todos los ZIPs del servidor
function cargarZips() {
  fetch(API, {
    headers: { Authorization: 'Bearer ' + token }
  })
    .then(res => res.json())
    .then(data => {
      zips = data.zips;
      mostrarPagina(1); // Muestra la primera página al cargar
    });
}

// Muestra una página concreta con los ZIPs filtrados
function mostrarPagina(pagina) {
  currentPage = pagina;

  // Aplica filtro de búsqueda
  const filtrados = zips.filter(zip => {
    const filtro = buscador.value.toLowerCase();
    return zip.nom.toLowerCase().includes(filtro);
  });

  // Calcula el rango de elementos a mostrar
  const start = (pagina - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginaActual = filtrados.slice(start, end);

  // Renderiza los elementos en la tabla
  tbody.innerHTML = '';
  paginaActual.forEach(zip => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <input type="text" class="form-control" value="${zip.nom}" data-original="${zip.nom}" />
      </td>
      <td>${zip.diesRestants} días</td>
      <td>
        <button class="btn btn-sm btn-success" onclick="descargar('${zip.nom}')">
          <i class="bi bi-download"></i>
        </button>
        <button class="btn btn-sm btn-primary" onclick="renombrar(this, '${zip.nom}')">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="btn btn-sm btn-danger" onclick="eliminar('${zip.nom}')">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  generarPaginacion(filtrados.length);
}

// Genera los botones de paginación dinámicamente
function generarPaginacion(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginacion = document.getElementById('paginacion');
  paginacion.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = `btn btn-sm ${i === currentPage ? 'btn-danger' : 'btn-outline-danger'} me-1`;
    btn.onclick = () => mostrarPagina(i);
    paginacion.appendChild(btn);
  }
}

// Elimina un archivo ZIP con confirmación
function eliminar(nombre) {
  if (!confirm(`¿Estás seguro de que quieres eliminar "${nombre}"?`)) return;
  fetch(`${API}/${nombre}`, {
    method: 'DELETE',
    headers: { Authorization: 'Bearer ' + token }
  })
    .then(res => res.json())
    .then(() => cargarZips());
}

// Renombra un archivo ZIP si el nombre ha cambiado
function renombrar(boton, nombreActual) {
  const input = boton.closest('tr').querySelector('input');
  const nuevoNombre = input.value;
  if (nuevoNombre === nombreActual || nuevoNombre.trim() === '') return;

  fetch(`${API}/${nombreActual}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({ nouNom: nuevoNombre })
  })
    .then(res => res.json())
    .then(() => cargarZips());
}

// Descarga el archivo ZIP
function descargar(nombre) {
  window.open(`${API}/download/${nombre}?token=${token}`, '_blank');
}

// Vuelve a mostrar la página 1 cuando se busca
buscador.addEventListener('input', () => mostrarPagina(1));

// Carga inicial al abrir la página
window.onload = cargarZips;
