import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5007/api/auth/login', {
        username,
        password
      });
      localStorage.setItem('token', response.data.token);
      navigate('/tasks');
    } catch (error) {
      setError('Autenticacion Fallida : Ingrese las credenciales correctas');
    }
  };

  return (
    <div className="login-container">
      
      <form onSubmit={handleLogin}>
        <div>     
          <h2>To-Do List</h2>
        </div>
        <div>
          <label>Usuario:      </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
