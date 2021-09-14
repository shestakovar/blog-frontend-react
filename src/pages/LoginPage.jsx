import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Container, Button, Alert } from 'react-bootstrap'
import TwoColumnsForm from '../components/UI/TwoColumnsForm';
import { useAction } from "../hooks/useAction";

const LoginPage = () => {
  const history = useHistory();
  const user = useSelector(state => state);
  const { loginUser } = useAction();
  const [userData, setUserData] = useState({ username: '', password: '' });
  const userDataPrint = {
    username: { name: 'логин', required: true },
    password: { name: 'пароль', type: 'password', required: true },
  };

  const login = async () => {
    const historyAction = history.goBack;
    await loginUser(userData, historyAction);
  }

  return (
    <Container className="login_page mt-4">
      <TwoColumnsForm
        data={userData}
        setData={setUserData}
        dataPrint={userDataPrint}
        submitAction={login}
        btnText="Войти"
        isLoading={user.loading}
        error={user.error}
      ></TwoColumnsForm>
      <Alert variant="secondary" className="mt-4">
        Еще не зарегистрированы?
      </Alert>
      <Button as={Link} to="/register">Зарегистрироваться</Button>
    </Container>
  )
}

export default LoginPage;
