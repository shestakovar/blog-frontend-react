import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap'
import AuthService from '../services/AuthService';
import RegisterForm from '../components/UI/RegisterForm';
import { useFormFetching } from "../hooks/useFormFetching";
import { useAction } from '../hooks/useAction';
import classes from './RegisterPage.module.css';
import MyError from "../components/UI/MyError";

const RegisterPage = () => {
  const { loginUser } = useAction();
  const [userData, setUserData] = useState({ username: '', password: '', first_name: '', last_name: '', email: '' });
  const history = useHistory();
  const userDataPrint = {
    username: { name: 'логин', required: true },
    password: { name: 'пароль', type: 'password', required: true },
    first_name: { name: 'имя', required: true },
    last_name: { name: 'фамилия', required: true },
    email: { name: 'электронная почта', type: 'email', required: true },
  };

  const [register, isLoading, error, clearError, validated] = useFormFetching(async () => {
    await AuthService.register(userData);
    const thunk = (response) => (history.push(`/users/${response.userid}`));
    loginUser(userData, thunk);
  });

  return (
    <Container className="register_page mt-5">
      <div className={classes.register_form}>
        {typeof error !== 'object' && <MyError error={error} />}
        <RegisterForm
          data={userData}
          setData={setUserData}
          dataPrint={userDataPrint}
          submitAction={register}
          btnText="Зарегистрироваться"
          error={error}
          isLoading={isLoading}
          validated={validated}
        />
      </div>
    </Container>
  )
}

export default RegisterPage;
