import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 

import '../assets/css/login.css';
import ilustracao from '../assets/img/ilustracao.png';
import logo from '../assets/img/logo.png';
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(u => u.email === email.trim() && u.password === password);

    if (user) {
      setMessageColor('green');
      setMessage('Login bem-sucedido!');
      localStorage.setItem('loggedUser', JSON.stringify(user));

      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      setMessageColor('red');
      setMessage('Email ou senha incorretos!');
    }
  };

  return (
    <div className="container">
      <Helmet>
        <title>Tropa Digital - Login</title>
      </Helmet>

      <div className="form-box">
        {/* LOGO + NOME EMPRESA */}
          <div className="logo" style={{ marginBottom: "2rem" }}>
            <img src={logo} alt="Logo" style={{ maxWidth: "100%" }} />
          </div>

        {/* TÍTULO E TEXTO */}
        <div className="form-content">
          <h1>Bem-vindo de volta</h1>
          <p>Entre com sua conta para acessar o painel.</p>
        </div>

        {/* FORMULÁRIO */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: 'pointer' }}
            >
              <img
                width="32"
                height="32"
                src={
                  showPassword
                    ? 'https://img.icons8.com/color/32/visible--v1.png'
                    : 'https://img.icons8.com/arcade/32/closed-eye.png'
                }
                alt="toggle password visibility"
              />
            </span>
          </div>

          <p className="register">
            Não tem conta? <Link to="/registro">Cadastre</Link>
          </p>

          <button type="submit">Entrar</button>
        </form>

        <div id="message" style={{ color: messageColor, marginTop: '10px' }}>{message}</div>
      </div>

      {/* ILUSTRAÇÃO */}
      <div className="image-box">
        <img src={ilustracao} alt="Ilustração" />
      </div>
    </div>
  );
};

export default Login;
