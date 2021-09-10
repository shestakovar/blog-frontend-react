import React, { useContext, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap'
import AuthService from '../services/AuthService';
import { AuthContext } from '../context';
import { useHistory } from 'react-router-dom';
import { useFormFetching } from '../hooks/useFormFetching';
import LoaderError from '../components/UI/LoaderError';

const RegisterPage = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const history = useHistory();

  const [login, isLoading, error, validated] = useFormFetching(async () => {
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
      <Form noValidate validated={validated} onSubmit={login}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Логин</Form.Label>
          <Form.Control required placeholder="Введите логин" value={userData.username} onChange={e => { setUserData({ ...userData, username: e.target.value }) }} />
          <Form.Control.Feedback type="invalid">Введите логин!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control required type="password" placeholder="Пароль" value={userData.password} onChange={e => { setUserData({ ...userData, password: e.target.value }) }} />
          <Form.Control.Feedback type="invalid">Введите пароль!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Имя</Form.Label>
          <Form.Control required placeholder="Введите имя" value={userData.first_name} onChange={e => { setUserData({ ...userData, first_name: e.target.value }) }} />
          <Form.Control.Feedback type="invalid">Введите имя!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSurname">
          <Form.Label>Фамилия</Form.Label>
          <Form.Control required placeholder="Введите фамилию" value={userData.last_name} onChange={e => { setUserData({ ...userData, last_name: e.target.value }) }} />
          <Form.Control.Feedback type="invalid">Введите фамилию!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>E-mail</Form.Label>
          <Form.Control required type="email" placeholder="Введите e-mail" value={userData.email} onChange={e => { setUserData({ ...userData, email: e.target.value }) }} />
          <Form.Control.Feedback type="invalid">Введите e-mail!</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Зарегистрироваться
        </Button>
      </Form>
    </Container>
  )
}

export default RegisterPage;
