// useForm.js
// Hook para manejar el estado y validación de formularios de manera reutilizable.

import { useState } from 'react';

export default function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);

  // Maneja el cambio de cualquier input
  const handleChange = e => {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
  };

  // Permite resetear el formulario
  const reset = () => setValues(initialValues);

  return { values, handleChange, reset, setValues };
}