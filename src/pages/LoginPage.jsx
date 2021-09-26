import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap'
import LoginForm from '../components/UI/LoginForm';
import { useAction } from "../hooks/useAction";
import classes from './LoginPage.module.css';
import LoaderError from '../components/UI/LoaderError';
import { useFormFetching } from "../hooks/useFormFetching";

const LoginPage = () => {
  const history = useHistory();
  const user = useSelector(state => state);
  const { loginUser, closeError } = useAction();
  const [userData, setUserData] = useState({ username: '', password: '' });
  const userDataPrint = {
    username: { name: 'логин', required: true },
    password: { name: 'пароль', type: 'password', required: true },
  };

  const [login, isLoading, error, clearError, validated] = useFormFetching(() => {
    const historyAction = history.goBack;
    loginUser(userData, historyAction);
  })

  return (
    <Container className="login_page mt-5">
      <div className={classes.auth_form}>
        <LoaderError error={user.error} closeError={closeError} />
        <LoginForm
          data={userData}
          setData={setUserData}
          dataPrint={userDataPrint}
          submitAction={login}
          isLoading={user.loading || isLoading}
          validated={validated}
        />
        <div className={`mt-4 ${classes.auth_form__register}`}>
          Еще не зарегистрированы? <Link className={classes.auth_form__register_link} to="/register">Зарегистрироваться</Link>
        </div>
      </div>
    </Container>
  )
}

export default LoginPage;
