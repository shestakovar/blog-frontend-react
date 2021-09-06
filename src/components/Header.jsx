import React, { useContext } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context';
import AuthService from '../services/AuthService';

const Header = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const logout = async () => {
    await AuthService.logout();
    setIsAuth(false);
    localStorage.removeItem('token');
  }

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
      </Container>
    </Navbar>
  )
}

export default Header;
