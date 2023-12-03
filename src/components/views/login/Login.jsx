import React, { useEffect, useState } from "react";
import { Alert, Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./login.css"
import logo from "./Logo.png"
import { useDispatch, useSelector } from "react-redux";
import { startLogin } from "../../../auth/domain/services/authServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const Login = () => {
  const { message } = useSelector((state) => state.app);
  const [inputs, setInputs] = useState({});
  const [eye, setEye] = useState(true);
  const [spinner, setSpinnner] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (message === 'Bienvenido') {
      navigate("/");
    }
  }, [message])

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

      dispatch(startLogin({ email: inputs.email, password: inputs.password }));

    } catch (error) {
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
                <div className="position-relative d-flex align-items-center">
                  <Form.Control
                    type = { eye ? "text": "password" }
                    placeholder="*****"
                    name="password"
                    value={inputs.password || ""}
                    onChange={(e) => handleChange(e)}
                    required
                    maxLength={20}
                  />
                  <FontAwesomeIcon
                    className="position-absolute top-50 end-0 translate-middle-y me-2"
                    style={{ cursor: 'pointer' }}
                    onClick={(() => setEye(!eye))}
                    icon={eye ? faEye : faEyeSlash} />
                </div>
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
