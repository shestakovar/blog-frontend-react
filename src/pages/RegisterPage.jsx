import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap'
import AuthService from '../services/AuthService';
import { AuthContext } from '../context';
import { useHistory } from 'react-router-dom';
import TwoColumnsForm from '../components/UI/TwoColumnsForm';

const RegisterPage = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [userData, setUserData] = useState({ username: '', password: '', first_name: '', last_name: '', email: '' });
  const history = useHistory();
  const [userDataPrint, setUserDataPrint] = useState({
    username: { name: 'логин', required: true },
    password: { name: 'пароль', type: 'password', required: true },
    first_name: { name: 'имя', required: true },
    last_name: { name: 'фамилия', required: true },
    email: { name: 'электронная почта', type: 'email', required: true },
  });

  const register = async () => {
    await AuthService.register(userData);
    const response = await AuthService.login(userData.username, userData.password);
    localStorage.setItem('token', response.access);
    localStorage.setItem('username', userData.username);
    localStorage.setItem('userid', response.userid);
    setIsAuth(true);
    history.push(`/users/${response.userid}`);
  }

  return (
    <Container className="mt-4">
      <TwoColumnsForm
        data={userData}
        setData={setUserData}
        dataPrint={userDataPrint}
        callback={register}
        btnText="Зарегистрироваться"
      ></TwoColumnsForm>
    </Container>
  )
}

export default RegisterPage;
