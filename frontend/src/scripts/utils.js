// utils.js
function toggleTheme() {
  const isDark = document.body.classList.toggle("dark-mode");
  document.getElementById("themeIcon").className = isDark ? "bi bi-sun" : "bi bi-moon";
  localStorage.setItem("darkMode", isDark);
}

function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}