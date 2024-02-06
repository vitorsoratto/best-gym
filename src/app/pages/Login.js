import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

import '../styles/Login.css';
import { login } from '../services/api_service';
import { wait } from '@testing-library/user-event/dist/utils';

export default function Login({ setToken }) {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleLogin = async () => {
    setFailed(false);
    setSuccess(false);
    try {
      const userData = { email, password };
      const response = await login(userData);

      if (response.status === 200) {
        setSuccess(true);
        setToken(response.data.token);
        wait(1000);
        window.location.reload();
      }
    } catch (error) {
      setSuccess(false);
      setFailed(true);
      console.error(error);
    }
  };

  return (
    <div className='login-container'>
        <div className='login-main'>
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
            {success && <Message className='message' severity='success' text='Sucesso!' />}
            {failed && (
              <Message className='message' severity='error' text='Usuário ou senha inválidos' />
            )}
          </div>
        </div>
      <div className='signup-link'>
        <span>
          Não tem uma conta?&nbsp;
          <a href='/signup'>Registre-se.</a>
        </span>
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
