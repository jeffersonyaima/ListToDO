import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Si no hay token, redirige al usuario a la página de inicio de sesión
    return <Navigate to="/login" />;
  }

  // Si hay token, permite el acceso a la ruta protegida
  return children;
};

export default ProtectedRoute;
