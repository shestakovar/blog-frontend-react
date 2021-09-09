import React, { useContext } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context';
import { useFetching } from '../hooks/useFetching';
import AuthService from '../services/AuthService';

const Header = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const [logout, isLoading, error] = useFetching(async () => {
    await AuthService.logout();
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuth(false);
  })

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Посты</Nav.Link>
            {!isAuth
              ? <Nav.Link as={NavLink} to="/login">Войти</Nav.Link>
              : <Nav.Link onClick={logout}>Выйти</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
        <div>{localStorage.getItem('username')}</div>
      </Container>
    </Navbar>
  )
}

export default Header;
