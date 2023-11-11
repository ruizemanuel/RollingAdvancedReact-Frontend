import React, { useState } from "react";
import { Alert, Container, Form, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./login.css"
import logo from "./Logo.png"
import { useDispatch } from "react-redux";
import { startLogin } from "../../../auth/domain/services/authServices";

const Login = () => {
  const [inputs, setInputs] = useState({});
  const [spinner, setSpinnner] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setSpinnner(true)

      dispatch(startLogin({ email: inputs.email, password: inputs.password })).then(() => {
        Swal.fire("Bienvenido!", "Inicio de sesión exitoso.", "success");
        navigate("/");
      })

    } catch (error) {
      console.log(error);
      setError(true);
      error.response.data?.message &&
        setErrorMessage(error.response.data?.message);
    }

    finally {
      setSpinnner(false)
    }
  };

  return (
    <div>
      <Container className="loginContainer">
        <Row>
          <Col className="imgLogin">
          </Col>
          <Col className="formLogin py-5">
            <div ><img src={logo} alt="logo" className="logoLogin pt-3"></img></div>
            <h1 className="text-center">Iniciar sesión</h1>
            <hr />
            <Form className="my-5" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email*</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ejemplo@mail.com"
                  name="email"
                  value={inputs.email || ""}
                  onChange={(e) => handleChange(e)}
                  required
                  maxLength={48}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña*</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="*****"
                  name="password"
                  value={inputs.password || ""}
                  onChange={(e) => handleChange(e)}
                  required
                  maxLength={20}
                />
              </Form.Group>
              {spinner ? (
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-3">
                  <button className="btn-login">Ingresar</button>
                </div>
              )
              }
            </Form>
            {error ? (
              <Alert variant="danger" onClick={() => setError(false)} dismissible>
                {errorMessage}
              </Alert>
            ) : null}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
