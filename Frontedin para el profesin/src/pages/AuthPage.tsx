import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { Login } from '../components/Login';
import { Register } from '../components/Register';
import { useAuth } from '../context/AuthContext';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirigir si el usuario ya está autenticado
  if (user) {
    navigate('/');
    return null;
  }

  return (
    <AuthLayout title={isLogin ? "Iniciar Sesión" : "Crear Cuenta"}>
      {isLogin ? (
        <Login onSwitchToRegister={() => setIsLogin(false)} />
      ) : (
        <Register onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </AuthLayout>
  );
} 