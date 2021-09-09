import React, { useContext, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap'
import AuthService from '../services/AuthService';
import { AuthContext } from '../context';
import { useHistory } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import LoaderError from '../components/LoaderError';

const RegisterPage = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const history = useHistory();

  const [login, isLoading, error] = useFetching(async (event) => {
    event.preventDefault();
    await AuthService.register(userData);
    const response = await AuthService.login(userData.username, userData.password);
    localStorage.setItem('token', response.access);
    localStorage.setItem('username', userData.username);
    localStorage.setItem('userid', response.userid);
    setIsAuth(true);
    history.push(`/users/${response.userid}`);
  })

  return (
    <Container className="mt-4">
      <LoaderError isLoading={isLoading} error={error} />
      <Form onSubmit={login}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Логин</Form.Label>
          <Form.Control placeholder="Введите логин" value={userData.username} onChange={e => { setUserData({ ...userData, username: e.target.value }) }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control type="password" placeholder="Пароль" value={userData.password} onChange={e => { setUserData({ ...userData, password: e.target.value }) }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Имя</Form.Label>
          <Form.Control placeholder="Введите имя" value={userData.first_name} onChange={e => { setUserData({ ...userData, first_name: e.target.value }) }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSurname">
          <Form.Label>Фамилия</Form.Label>
          <Form.Control placeholder="Введите фамилию" value={userData.last_name} onChange={e => { setUserData({ ...userData, last_name: e.target.value }) }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>E-mail</Form.Label>
          <Form.Control type="email" placeholder="Введите e-mail" value={userData.email} onChange={e => { setUserData({ ...userData, email: e.target.value }) }} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Зарегистрироваться
        </Button>
      </Form>
    </Container>
  )
}

export default RegisterPage;
