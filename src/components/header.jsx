import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import { logout } from "../actions/userAction";

function Header() {
  const userLogin = useSelector(state => state.userLogin);
  const {userInfo} = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = () =>{
    dispatch(logout());
  }

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand href="/">MyCart</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
            { userInfo ? (
              <NavDropdown title={userInfo.name} id="username" >
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-sign-in-alt"></i> SignIn
                </Nav.Link>
              </LinkContainer>
            )}
              <LinkContainer to="/cart">
                <Nav.Link href="#link">
                  <i className="fas fa-shopping-cart"></i>&nbsp;Cart
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;