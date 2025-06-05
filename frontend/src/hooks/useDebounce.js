// useDebounce.js
// Hook para debouncing: retrasa la actualización de un valor hasta que el usuario deja de escribir.

import { useState, useEffect } from 'react';

export default function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}