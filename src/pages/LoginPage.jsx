import React, { useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap'
import { AuthContext } from '../context';

const LoginPage = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const login = event => {
    event.preventDefault();
    localStorage.setItem('auth', 'true');
    setIsAuth(true);
  }
  return (
    <Container className="mt-4">
      <Form onSubmit={login}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Имя пользователя</Form.Label>
          <Form.Control placeholder="Введите имя пользователя" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control type="password" placeholder="Пароль" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Войти
        </Button>
      </Form>
    </Container>
  )
}

export default LoginPage;
