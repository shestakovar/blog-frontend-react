import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import UserService from '../services/UserService';
import { useFetching } from '../hooks/useFetching';
import { Container } from 'react-bootstrap';
import LoaderError from '../components/UI/LoaderError';

const UserPage = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const [fetchUser, isLoading, error] = useFetching(async () => {
    const response = await UserService.getUser(params.id);
    setUser(response);
  });

  useEffect(() => {
    fetchUser();
  }, [])

  if (isLoading || error)
    return (
      <LoaderError isLoading={isLoading} error={error} />
    )

  return (
    <Container>
      <div>{user.username}</div>
      <div>{user.first_name}</div>
      <div>{user.last_name}</div>
      <div>{user.last_login}</div>
      <div>{user.email}</div>
      <div>{user.date_joined}</div>
    </Container>
  )
}

export default UserPage;
