import React from "react";
import { useEffect, useState } from "react";
import { Button, Container, NavDropdown, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "./LogoRolling.png"
import "./navbar.css"


const Navigation = ({ loggedUser, setLoggedUser, products }) => {

  const [roles, setRoles] = useState(loggedUser.roles);

  const navigate = useNavigate()

  useEffect(() => {
    getUsers();
  }, [loggedUser]);

  const getUsers = async () => {

    setRoles(loggedUser.roles)

  };

  roles?.includes('admin') && localStorage.setItem("is-authorized", JSON.stringify('true'));



  const logout = () => {
    localStorage.removeItem("user-token");
    localStorage.removeItem("is-authorized");
    setLoggedUser({})
    setRoles([])
    navigate("/")
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

              <Link className="nav-link d-flex flex-column justify-content-center" to="/">
                Inicio
              </Link>
              {loggedUser.email ? (
                <>
                  {roles?.includes('admin') ? (
                    <NavDropdown title="Administrar" id="administrar-dropdown">
                    <Link className="dropdown-item" to="/products">
                      Menu
                    </Link>
                    <Link className="dropdown-item" to="/users">
                      Usuarios
                    </Link>
                    <Link className="dropdown-item" to="/pedidos/table">
                      Pedidos
                    </Link>
                  </NavDropdown>

                  ) : (
                    <div></div>
                  )
                  }

                  <>
                    <Link className="nav-link d-flex flex-column justify-content-center" to="/pedidos">
                      Pedidos
                    </Link>

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
