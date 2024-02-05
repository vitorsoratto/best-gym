import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import validator from 'validator';

import '../styles/Signup.css';
import { signup } from '../services/api_service';
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validateData, setValidateData] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignup = async () => {
    setValidateData(true);
    try {
      if (name.trim() === '' || !validator.isEmail(email) || password.trim() === '') return;

      const userData = { name, email, password };
      const response = await signup(userData);

      if (response.status === 201) setSuccess(true);
    } catch (error) {
      console.error(error.response?.data);
    }
  };

  return (
    <div className='signup-container'>
      <div className='signup-main'>
        <h2>Cadastro</h2>
        <div className='p-fluid'>
          <div className='p-field'>
            <label htmlFor='name'>Nome</label>
            <InputText
              id='name'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {validateData && name.trim() === '' && (
              <small className='p-error'>O nome é obrigatório</small>
            )}
          </div>
          <div className='p-field'>
            <label htmlFor='email'>E-mail</label>
            <InputText
              id='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {validateData && !validator.isEmail(email) && (
              <small className='p-error'>Insira um e-mail válido!</small>
            )}
          </div>
          <div className='p-field'>
            <label htmlFor='password'>Senha</label>
            <InputText
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {validateData && password.trim() === '' && (
              <small className='p-error'>A senha é obrigatória</small>
            )}
          </div>
          <Button label='Cadastrar' onClick={handleSignup} />
          {success && (
            <div>
              <Message className='success-message' severity='success' text='Usuário cadastro com sucesso!' />
              <span className='login-redirect'>
                <a href='/login'>Clique aqui</a>
                &nbsp;para entrar.
              </span>
            </div>
          )}
        </div>
      </div>
      <div className='signup-link'>
        <span>
          Já tem conta?&nbsp;
          <a href='/login'>Entrar.</a>
        </span>
      </div>
    </div>
  );
};

export default Signup;
