import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import '../styles/Login.css';
import { login } from '../services/api_service';

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userData = { email, password };
      const response = await login(userData);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <div className='p-fluid'>
        <div className='p-field'>
          <label htmlFor='email'>Usuário</label>
          <InputText
            id='email'
            type='text'
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className='p-field'>
          <label htmlFor='password'>Senha</label>
          <InputText
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button label='Entrar' onClick={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
