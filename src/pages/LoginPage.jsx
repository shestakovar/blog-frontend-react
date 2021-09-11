import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Container, Button, Alert } from 'react-bootstrap'
import AuthService from '../services/AuthService';
import TwoColumnsForm from '../components/UI/TwoColumnsForm';
import { loginAction } from '../store/store';

const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({ username: '', password: '' });
  const [userDataPrint, setUserDataPrint] = useState({
    username: { name: 'логин', required: true },
    password: { name: 'пароль', type: 'password', required: true },
  });

  const login = async (event) => {
    const response = await AuthService.login(userData.username, userData.password);
    const username = userData.username;
    dispatch(loginAction({response, username}));
    history.goBack();
  }

  return (
    <Container className="mt-4">
      <TwoColumnsForm
        data={userData}
        setData={setUserData}
        dataPrint={userDataPrint}
        callback={login}
        btnText="Войти"
      ></TwoColumnsForm>
      <Alert variant="secondary" className="mt-4">
        Еще не зарегистрированы?
      </Alert>
      <Button as={Link} to="/register"> Зарегистрироваться</Button>
    </Container>
  )
}

export default LoginPage;
