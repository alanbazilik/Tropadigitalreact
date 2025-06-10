import React, { useState } from 'react';
import '../assets/css/relogin.css';
import ilustracao from '../assets/img/ilustracao.png';

export default function Registro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [color, setColor] = useState('#000000');
  const [birthdate, setBirthdate] = useState('');
  const [photo, setPhoto] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Função para ler a foto e retornar base64
  const readPhoto = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      alert('Envie uma foto!');
      return;
    }

    try {
      const photoData = await readPhoto(photo);

      const user = {
        name: name.trim(),
        email: email.trim(),
        password,
        color,
        birthdate,
        photo: photoData, // Aqui está a foto em base64
      };

      // Pega os usuários do localStorage ou cria array vazio
      const users = JSON.parse(localStorage.getItem('users')) || [];

      // Adiciona o novo usuário
      users.push(user);

      // Salva no localStorage
      localStorage.setItem('users', JSON.stringify(users));

      alert('Cadastro realizado com sucesso!');

      // Redireciona para a página inicial (login)
      window.location.href = '/'; // Se usar react-router, use useNavigate

    } catch (error) {
      alert('Erro ao processar a foto.');
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <div className="logo">
          👨‍🚀 <strong>Tropa Digital</strong>
        </div>

        <div className="form-content">
          <h1>Crie sua conta</h1>
          <p>Preencha os dados abaixo para se cadastrar.</p>
        </div>

        <form id="registerForm" onSubmit={handleSubmit}>
          <label htmlFor="name">Nome completo</label>
          <input
            type="text"
            id="name"
            placeholder="Nome completo"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Senha</label>
          <div className="password-container" style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ flex: 1 }}
            />
            <span
              id="togglePassword"
              className="eye-icon"
              style={{ cursor: 'pointer', marginLeft: '8px' }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <img
                  width="32"
                  height="32"
                  src="https://img.icons8.com/color/32/visible--v1.png"
                  alt="visible"
                />
              ) : (
                <img
                  width="32"
                  height="32"
                  src="https://img.icons8.com/arcade/32/closed-eye.png"
                  alt="hidden"
                />
              )}
            </span>
          </div>

          <label htmlFor="color">Cor favorita</label>
          <input
            type="color"
            id="color"
            required
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />

          <label htmlFor="photo">Foto</label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])} // required é opcional aqui, você valida manualmente
          />

          <label htmlFor="birthdate">Data de nascimento</label>
          <input
            type="date"
            id="birthdate"
            required
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />

          <p className="register">
            Já tem conta? <a href="/">Entrar</a>
          </p>

          <button type="submit">Cadastrar</button>
        </form>
      </div>

      <div className="image-box">
        <img src={ilustracao} alt="Ilustração" />
      </div>
    </div>
  );
}
