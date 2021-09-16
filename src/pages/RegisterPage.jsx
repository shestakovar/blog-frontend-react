import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap'
import AuthService from '../services/AuthService';
import TwoColumnsForm from '../components/UI/TwoColumnsForm';
import { useFetching } from '../hooks/useFetching';
import { useAction } from '../hooks/useAction';

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

  const [register, isLoading, error] = useFetching(async () => {
    await AuthService.register(userData);
    const thunk = (response) => (history.push(`/users/${response.userid}`));
    await loginUser(userData, thunk);
  });

  return (
    <Container className="mt-4">
      <TwoColumnsForm
        data={userData}
        setData={setUserData}
        dataPrint={userDataPrint}
        submitAction={register}
        btnText="Зарегистрироваться"
        isLoading={isLoading}
        error={error}
      ></TwoColumnsForm>
    </Container>
  )
}

export default RegisterPage;
