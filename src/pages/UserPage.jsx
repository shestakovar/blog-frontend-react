import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import UserService from '../services/UserService';
import { useFetching } from '../hooks/useFetching';
import { Container, Form, Button } from 'react-bootstrap';
import LoaderError from '../components/UI/LoaderError';
import { useFormFetching } from '../hooks/useFormFetching';

const UserPage = () => {
  const params = useParams();
  const [userData, setUserData] = useState({});
  const [fetchUser, isLoading, error] = useFetching(async () => {
    const response = await UserService.getUser(params.id);
    setUserData(response);
  });

  const [updateUser, isUpdatingUser, updateUserError, validated] = useFormFetching(async () => {
    const response = await UserService.patchUser(params.id, userData);
    setUserData(response);
  })

  useEffect(() => {
    fetchUser();
  }, [])

  if (isLoading || error)
    return (
      <LoaderError isLoading={isLoading} error={error} />
    )

  return (
    <Container className="mt-4">
      <LoaderError isLoading={isUpdatingUser} error={updateUserError} />
      <Form noValidate validated={validated} onSubmit={updateUser}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Логин</Form.Label>
          <Form.Control required placeholder="Введите логин" value={userData.username} onChange={e => { setUserData({ ...userData, username: e.target.value }) }} />
          <Form.Control.Feedback type="invalid">Введите логин!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control required type="password" placeholder="Пароль" value={userData.password} onChange={e => { setUserData({ ...userData, password: e.target.value }) }} />
          <Form.Control.Feedback type="invalid">Введите пароль!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Имя</Form.Label>
          <Form.Control required placeholder="Введите имя" value={userData.first_name} onChange={e => { setUserData({ ...userData, first_name: e.target.value }) }} />
          <Form.Control.Feedback type="invalid">Введите имя!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSurname">
          <Form.Label>Фамилия</Form.Label>
          <Form.Control required placeholder="Введите фамилию" value={userData.last_name} onChange={e => { setUserData({ ...userData, last_name: e.target.value }) }} />
          <Form.Control.Feedback type="invalid">Введите фамилию!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>E-mail</Form.Label>
          <Form.Control required type="email" placeholder="Введите e-mail" value={userData.email} onChange={e => { setUserData({ ...userData, email: e.target.value }) }} />
          <Form.Control.Feedback type="invalid">Введите e-mail!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLastLogin">
          <Form.Label>Последний визит</Form.Label>
          <Form.Control disabled placeholder="Никогда" value={userData.last_login} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDateJoined">
          <Form.Label>Дата регистрации</Form.Label>
          <Form.Control disabled placeholder="Никогда" value={userData.date_joined} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Изменить
        </Button>
      </Form>
    </Container>
  )
}

export default UserPage;
