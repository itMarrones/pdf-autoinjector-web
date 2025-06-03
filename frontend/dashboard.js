// dashboard.js

// Comprueba si hay un token y si el rol es "operador". Si no, redirige al login.
const token = localStorage.getItem('token');
if (!token || localStorage.getItem('rol') !== 'operador') {
  window.location.href = 'login.html';
}

// --- Envío del formulario para generar PDFs ---
const formGenerar = document.getElementById('formGenerar');
formGenerar.addEventListener('submit', e => {
  e.preventDefault(); // Previene recarga del formulario
  const formData = new FormData(formGenerar); // Crea objeto con los datos del formulario

  // Realiza la petición POST al backend para generar PDFs
  fetch('http://10.254.10.140:4000/api/generar', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token }, // Añade token JWT
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      const msg = document.getElementById('msgPDF');
      if (data.success) {
        msg.innerHTML = `<a href="${data.downloadUrl}" target="_blank">Descargar ZIP</a>`;
        msg.className = 'mt-3 text-success text-center';
      } else {
        msg.textContent = 'Error: ' + data.error;
        msg.className = 'mt-3 text-danger text-center';
      }
    });
});

// --- Envío del formulario para actualizar códigos LER ---
const formLER = document.getElementById('formLER');
formLER.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(formLER);

  // Realiza la petición POST al backend para actualizar LER
  fetch('http://10.254.10.140:4000/api/ler', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token },
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      const msg = document.getElementById('msgLER');
      if (data.success) {
        msg.textContent = 'Códigos LER actualizados correctamente';
        msg.className = 'mt-3 text-success text-center';
      } else {
        msg.textContent = 'Error: ' + data.error;
        msg.className = 'mt-3 text-danger text-center';
      }
    });
});

// --- Función para alternar entre tema claro y oscuro ---
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-mode'); // Aplica clase al body
  document.getElementById('themeIcon').className = isDark ? 'bi bi-sun' : 'bi bi-moon'; // Cambia icono
  document.getElementById('logo').src = isDark
    ? 'https://www.marrones.com/wp-content/uploads/2025/05/logo_marrones_blanco.png'
    : 'https://www.marrones.com/wp-content/uploads/2025/05/logo_marrones-rojo.png';
  localStorage.setItem('darkMode', isDark); // Guarda preferencia
}

// --- Cierra sesión ---
function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}

// --- Aplica el tema guardado al cargar la página ---
window.onload = () => {
  const dark = localStorage.getItem('darkMode') === 'true';
  if (dark) document.body.classList.add('dark-mode');
  document.getElementById('themeIcon').className = dark ? 'bi bi-sun' : 'bi bi-moon';
  document.getElementById('logo').src = dark
    ? 'https://www.marrones.com/wp-content/uploads/2025/05/logo_marrones_blanco.png'
    : 'https://www.marrones.com/wp-content/uploads/2025/05/logo_marrones-rojo.png';
};
