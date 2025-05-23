import React, { useState } from 'react';

const Login: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userName, userPassword })
      });

      if (!response.ok) {
        throw new Error('Usuario o contraseña incorrectos');
      }

      const data = await response.json();
      localStorage.setItem('authToken', data.token);
      alert('Inicio de sesión exitoso');
      // Redirige si es necesario, por ejemplo con react-router
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              placeholder="Ingresa tu usuario"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="userPassword" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="userPassword"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              required
              placeholder="********"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
