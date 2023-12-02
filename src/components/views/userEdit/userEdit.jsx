import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../../share/domain/services/appServices";

const UserEdit = () => {
  const [userAdmin, setUserAdmin] = useState(false);
  const [spinner, setSpinnner] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { dataToEdit: userApi } = useSelector(state => state.app);
  const dispatch = useDispatch();

  let rolesRef = [];
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if(!userApi){
      return navigate('/users');
    }
  }, [userApi])

  useEffect(() => {
    setCheckboxes();
  }, []);

  const setCheckboxes = async () => {
    try {
      userApi.roles.includes('admin') && setUserAdmin(true);
      setIsChecked(userApi.activo)
      rolesRef = userApi.roles

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setIsChecked(event.target.checked);

  };

  const handleChangeAdmin = (event) => {
    setUserAdmin(event.target.checked)
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    if (userAdmin) {
      rolesRef = ["user", "admin"]
    } else {
      rolesRef = ["user"]
    }

    const userUpdated = {
      activo: isChecked,
      roles: rolesRef,
    };

    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podrás revertir los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Modificar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setSpinnner(true)
          dispatch(updateData('/users', userUpdated, id)).then(() => {
            navigate('/users');
          })
        } catch (error) {
          console.log(error);
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
        <h1>Modificar usuario</h1>
        <hr />
        <Form
          className="my-5"
          onSubmit={handleSubmit}
        >
          <div className="d-flex text-center">

            <div className="me-4">
              Estado
            </div>

            <div className="form-check">
              <input className="form-check-input" type="checkbox" checked={isChecked}
                onChange={(e) => handleChange(e)} id="defaultCheck1" />
              {isChecked ? (
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Activo
                </label>)
                : (
                  <label className="form-check-label" htmlFor="defaultCheck1">
                    Inactivo
                  </label>
                )}
            </div>

          </div>

          <div className="d-flex text-center">


            <div className="me-4">
              Es Admin
            </div>


            <div className="form-check">
              <input className="form-check-input" type="checkbox" checked={userAdmin}
                onChange={(e) => handleChangeAdmin(e)} id="defaultCheck2" />
              {userAdmin ? (
                <label className="form-check-label" htmlFor="defaultCheck2">
                  Es admin
                </label>)
                : (
                  <label className="form-check-label" htmlFor="defaultCheck2">
                    No es admin
                  </label>
                )}
            </div>

          </div>


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
      </Container>
    </div>
  );
};

export default UserEdit;
