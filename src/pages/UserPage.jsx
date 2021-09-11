import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import UserService from '../services/UserService';
import { useFetching } from '../hooks/useFetching';
import { Container } from 'react-bootstrap';
import LoaderError from '../components/UI/LoaderError';
import TwoColumnsEditForm from '../components/UI/TwoColumnsEditForm';
import { removeEmpty } from '../utils/object';
import { timePassed, addHours } from '../utils/time';

const UserPage = () => {
  const params = useParams();
  const [userData, setUserData] = useState({ username: '', password: '', first_name: '', last_name: '', email: '', last_login: '', date_joined: '' });
  const [userDataPrint, setUserDataPrint] = useState({
    username: { name: 'логин', required: true, readOnly: true },
    password: { name: 'пароль', type: 'password', required: true, readOnly: true },
    first_name: { name: 'имя', required: true, readOnly: true },
    last_name: { name: 'фамилия', required: true, readOnly: true },
    email: { name: 'e-mail', type: 'email', required: true, readOnly: true },
    last_login: { name: 'последний визит', readOnly: true, plainText: true },
    date_joined: { name: 'дата регистрации', readOnly: true, plainText: true },
  });
  const [fetchUser, isLoading, error] = useFetching(async () => {
    const response = await UserService.getUser(params.id);
    setUserData({ password: '', ...response });
    setUserData((state) => ({ ...state, last_login: timePassed(state.last_login), date_joined: addHours(state.date_joined) }));
  });

  const updateUser = async () => {
    const updated = removeEmpty(userData);
    const response = await UserService.patchUser(params.id, updated);
    setUserData({ password: '', ...response });
  }

  useEffect(() => {
    fetchUser();
  }, [])

  if (isLoading || error)
    return (
      <LoaderError isLoading={isLoading} error={error} />
    )

  return (
    <Container className="mt-4">
      <TwoColumnsEditForm
        data={userData}
        setData={setUserData}
        dataPrint={userDataPrint}
        setDataPrint={setUserDataPrint}
        callback={updateUser}
      ></TwoColumnsEditForm>
    </Container >
  )
}

export default UserPage;
