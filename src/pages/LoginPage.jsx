import React, { useContext, useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap'
import AuthService from '../services/AuthService';
import { AuthContext } from '../context';

const LoginPage = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errResponse, setErrResponse] = useState('');

  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await AuthService.login(username, password);
      localStorage.setItem('token', response.access);
      setIsAuth(true);
    } catch (e) {
      setErrResponse(e?.response?.data?.detail)
    }
  }

  return (
    <Container className="mt-4">
      {errResponse ? <Alert variant="danger">{errResponse}</Alert> : ''}
      <Form onSubmit={login}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Имя пользователя</Form.Label>
          <Form.Control placeholder="Введите имя пользователя" value={username} onChange={e => { setUsername(e.target.value) }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control type="password" placeholder="Пароль" value={password} onChange={e => { setPassword(e.target.value) }} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Войти
        </Button>
      </Form>
    </Container>
  )
}

export default LoginPage;
