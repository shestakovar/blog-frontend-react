import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import UserService from '../services/UserService';
import { useFetching } from '../hooks/useFetching';
import { Container } from 'react-bootstrap';
import LoaderError from '../components/UI/LoaderError';
import UserForm from '../components/UI/UserForm';
import { timePassed, addHours } from '../utils/time';
import { useTypedSelector } from "../hooks/useTypedSelector";
import classes from './UserPage.module.css';
import PasswordChangeModal from '../components/PasswordChangeModal';
import { IPrint, IPrintField, IUser } from "../types/types";

interface params {
  id: string;
}

const UserPage: FC = () => {
  const params = useParams<params>();
  const userId = parseInt(params.id);
  const user = useTypedSelector(state => state);
  const [canBeChanged, setCanBeChanged] = useState<boolean>(false);
  const [userData, setUserData] = useState<IPrintField>({ username: '', first_name: '', last_name: '', email: '', last_login: '', date_joined: '' });
  const [userDataPrint, setUserDataPrint] = useState<IPrint>({
    username: { name: 'логин', required: true, readOnly: true },
    first_name: { name: 'имя', required: true, readOnly: true },
    last_name: { name: 'фамилия', required: true, readOnly: true },
    email: { name: 'e-mail', type: 'email', required: true, readOnly: true },
    last_login: { name: 'последний визит', readOnly: true, plainText: true },
    date_joined: { name: 'дата регистрации', readOnly: true, plainText: true },
  });

  const setFixedUserData = (response: IUser) => {
    let tempUserData = { ...response, last_login: timePassed(response.last_login), date_joined: addHours(response.date_joined) };
    if (!tempUserData.last_login)
      tempUserData.last_login = 'Никогда';
    setUserData(tempUserData);
  }

  const [fetchUser, isLoading, error, clearError] = useFetching(async () => {
    const response = await UserService.getUser(userId);
    setFixedUserData(response);
  });



  useEffect(() => {
    fetchUser();
  }, [user.userid, params.id]);

  useEffect(() => {
    setCanBeChanged(!user.loading && user.isAuth && user.userid == params.id);

  }, [user.loading, user.isAuth, user.userid, params.id])


  if (isLoading || error)
    return (
      <LoaderError isLoading={isLoading} error={error} closeError={clearError} />
    )

  return (
    <Container className="mt-5">
      <div className={classes.user_form}>

        <UserForm
          data={userData}
          setData={setUserData}
          dataPrint={userDataPrint}
          setDataPrint={setUserDataPrint}
          canBeChanged={canBeChanged}
          setFixedUserData={setFixedUserData}
        />
        {canBeChanged && <PasswordChangeModal userId={userId} />}
      </div>

    </Container >
  )
}

export default UserPage;
