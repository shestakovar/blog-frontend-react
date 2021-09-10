import React, { useContext } from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context';
import { useFetching } from '../hooks/useFetching';
import AuthService from '../services/AuthService';

const Header = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const username = localStorage.getItem('username');
  const userid = localStorage.getItem('userid');

  const [logout, isLoading, error] = useFetching(async () => {
    await AuthService.logout();
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userid');
    setIsAuth(false);
  })

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/" exact>React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" exact>Посты</Nav.Link>
            {isAuth
              ? <Nav.Link as={NavLink} to="/posts/add">Написать пост</Nav.Link>
              : null
            }
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {isAuth
              ? <NavDropdown title={username} id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} to={`/users/${userid}`}>Личный кабинет</NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>Выйти</NavDropdown.Item>
              </NavDropdown>
              : <Nav.Link as={NavLink} to="/login">Войти</Nav.Link>
            }
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;
