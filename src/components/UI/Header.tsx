import React, { FC } from 'react'
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useAction } from '../../hooks/useAction';


const Header:FC = () => {
  const { logoutUser } = useAction()
  const isAuth = useTypedSelector(state => state.isAuth);
  const username = useTypedSelector(state => state.username);
  const userid = useTypedSelector(state => state.userid);

  const logout = () => {
    logoutUser();
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/" exact>React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" exact>Посты</Nav.Link>
            {isAuth
              ? <React.Fragment>
                <Nav.Link as={NavLink} to={`/posts/${userid}`}>Мои посты</Nav.Link>
                <Nav.Link as={NavLink} to="/posts/add">Написать пост</Nav.Link>
              </React.Fragment>
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
