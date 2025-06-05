// Footer.jsx
// Componente de pie de página para la aplicación PDF AutoInjector Web.
// Muestra información corporativa y es reutilizable en todas las páginas principales del frontend.

import React from 'react';

// No recibe props, pero puedes añadirlas si necesitas personalizar el footer en el futuro.
const Footer = () => (
  <footer className="text-center mt-4 mb-2 text-muted">
    {/* Texto corporativo y año dinámico */}
    &copy; {new Date().getFullYear()} Marrones S.L. | PDF AutoInjector
  </footer>
);

export default Footer;