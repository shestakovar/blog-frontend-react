import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap'
import LoginForm from '../components/UI/LoginForm';
import { useAction } from "../hooks/useAction";
import classes from './LoginPage.module.css';
import LoaderError from '../components/UI/LoaderError';

const LoginPage = () => {
  const history = useHistory();
  const user = useSelector(state => state);
  const { loginUser, closeError } = useAction();
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
    <Container className="login_page mt-5">
      <div className={classes.auth_form}>
        <LoaderError error={user.error} closeError={closeError} />
        <LoginForm
          data={userData}
          setData={setUserData}
          dataPrint={userDataPrint}
          submitAction={login}
          btnText="Войти"
          isLoading={user.loading}
        ></LoginForm>
        <div className={`mt-4 ${classes.auth_form__register}`}>
          Еще не зарегистрированы? <Link className={classes.auth_form__register_link} to="/register">Зарегистрироваться</Link>
        </div>
      </div>
    </Container>
  )
}

export default LoginPage;
