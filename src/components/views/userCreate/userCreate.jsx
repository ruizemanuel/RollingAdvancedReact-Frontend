import React, { useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  validateUserName,
  validateEmail,
  validatePassword
} from "../../helpers/validateFields";
import { useNavigate } from "react-router-dom";
import axios from "../../../config/axiosInit";
import { useDispatch } from "react-redux";
import { createNewData } from "../../../share/domain/services/appServices";

const UserCreate = () => {

  const [inputs, setInputs] = useState({});
  const [spinner, setSpinnner] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateUserName(inputs.name) !== 'ok') {
      Swal.fire("Error!", `${validateUserName(inputs.name)}`, "error");
      return;
    } else if (validateEmail(inputs.email) !== 'ok') {
      Swal.fire("Error!", `${validateEmail(inputs.email)}`, "error");
      return;
    } else if (validatePassword(inputs.password) !== 'ok') {
      Swal.fire("Error!", `${validatePassword(inputs.password)}`, "error");
      return;
    } else if (validatePassword(inputs.passwordrep) !== 'ok') {
      Swal.fire("Error!", `${validatePassword(inputs.passwordrep)}`, "error");
      return;
    }

    const newUser = {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
      passwordrep: inputs.passwordrep,
      roles: ['user'],
      activo: true
    };

    Swal.fire({
      title: "Estas por crear un nuevo usuario",
      text: "¿Desea guardar los cambios?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Guardar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setSpinnner(true)
          dispatch(createNewData('/auth/register', newUser)).then(() => {
            e.target.reset();
            navigate("/users");
          })
        } catch (error) {
          console.log(error.response.data.errors);
          error.response.data?.message &&
            setErrorMessage(error.response.data?.message);
          error.response.data.errors?.length > 0 &&
            error.response.data.errors?.map((error) =>
              setErrorMessage(error.msg)
            );
          setShow(true);
        }
        finally {
          setSpinnner(false)
        }
      }
    });
  };

  return (
    <div>
      <Container className="py-5">
        <h1>Agregar usuario</h1>
        <hr />
        <Form className="my-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>Nombre de usuario*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: John Doe"
              name="name"
              value={inputs.name || ""}
              onChange={(e) => handleChange(e)}
              required
              minLength='5'
              maxLength="100"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email*</Form.Label>
            <Form.Control
              type="text"
              placeholder="johndoe@gmail.com"
              name="email"
              value={inputs.email || ""}
              onChange={(e) => handleChange(e)}
              required
              minLength='5'
              maxLength="100"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ej: Ingrese su contraseña"
              name="password"
              value={inputs.password || ""}
              onChange={(e) => handleChange(e)}
              required
              minLength='8'
              maxLength='20'
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPasswordRep">
            <Form.Label>Repetir Contraseña*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ej: Repita su contraseña"
              name="passwordrep"
              value={inputs.passwordrep || ""}
              onChange={(e) => handleChange(e)}
              required
              minLength='8'
              maxLength='20'
            />
          </Form.Group>


          {spinner ? (

            <div className="text-end">
              <button className="delete-btn text-light" type="button" disabled>
                <span className="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
                Cargando...
              </button>
            </div>

          ) : (

            <div className="text-end">
              <button className="delete-btn text-light">Guardar</button>
            </div>

          )}
        </Form>
        {show && (
          <Alert
            key={errorMessage}
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            {errorMessage}
          </Alert>
        )}
      </Container>
    </div>
  );
};

export default UserCreate;
