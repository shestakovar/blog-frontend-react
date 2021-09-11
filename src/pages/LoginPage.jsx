import React, { useContext, useState } from 'react';
import { Container, Button, Alert } from 'react-bootstrap'
import AuthService from '../services/AuthService';
import { AuthContext } from '../context';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TwoColumnsForm from '../components/UI/TwoColumnsForm';

const LoginPage = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [userData, setUserData] = useState({ username: '', password: '' });
  const history = useHistory();
  const [userDataPrint, setUserDataPrint] = useState({
    username: { name: 'логин', required: true },
    password: { name: 'пароль', type: 'password', required: true },
  });

  const login = async (event) => {
    const response = await AuthService.login(userData.username, userData.password);
    localStorage.setItem('token', response.access);
    localStorage.setItem('username', userData.username);
    localStorage.setItem('userid', response.userid);
    setIsAuth(true);
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
