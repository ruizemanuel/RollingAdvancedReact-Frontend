import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, NavDropdown, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "./LogoRolling.png"
import "./navbar.css"
import { startLogout } from "../../auth/domain/services/authServices";


const Navigation = () => {

  const { status, roles } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(startLogout()).then(() => {
      navigate("/")
    })
  }

  return (
    <div>
      <Navbar className="bg-red" expand="lg">
        <Container>
          <Navbar.Brand className="logo" href="/">
            <img src={logo} alt="logo" className="logo"></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto color-nav">
              {status === 'authenticated' && roles?.includes('admin') ? (
                <>
                    <NavDropdown title="Administrar" id="administrar-dropdown" className="mx-auto mx-lg-0 mb-3 mb-lg-0">
                    <Link className="dropdown-item" to="/products">
                      Menu
                    </Link>
                    <Link className="dropdown-item" to="/users">
                      Usuarios
                    </Link>
                  </NavDropdown>
                  <>
                    <div className="d-flex flex-column justify-content-center">
                      <Button variant="dark" onClick={logout}>
                        Cerrar sesión
                      </Button>
                    </div>

                  </>
                </>
              ) : (
                <>
                  <Link className="nav-link d-flex flex-column justify-content-center" to="/auth/login">
                    Iniciar sesión
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
