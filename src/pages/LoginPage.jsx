import React, { useContext, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap'
import AuthService from '../services/AuthService';
import { AuthContext } from '../context';
import { useHistory } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import LoaderError from '../components/LoaderError';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const [login, isLoading, error] = useFetching(async (event) => {
    event.preventDefault();
    const response = await AuthService.login(username, password);
    localStorage.setItem('token', response.access);
    setIsAuth(true);
    history.goBack();
  })

  return (
    <Container className="mt-4">
      <LoaderError isLoading={isLoading} error={error} />
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
      <div>Еще не зарегистрированы? <Button as={Link} to="/register"> Зарегистрироваться</Button></div>
    </Container>
  )
}

export default LoginPage;
