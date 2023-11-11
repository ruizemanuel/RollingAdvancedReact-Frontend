import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import axios from "../../../config/axiosInit"
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../../share/domain/services/appServices";

const PedidoAdminEdit = () => {

  const [isChecked, setIsChecked] = useState(false);
  const [spinner, setSpinnner] = useState(false);
  const { dataToEdit: pedido } = useSelector(state => state.app);

  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!pedido) {
      return navigate('/pedidos');
    }
  }, [pedido])

  useEffect(() => {
    initPedido();
  }, []);

  const initPedido = async () => {
    try {
      
      if (pedido.estado === 'Pendiente') {
        setIsChecked(false)
      } else {
        setIsChecked(true)
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleChange = (event) => {
    setIsChecked(event.target.checked);

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const pedidoUpdated = {
      estado: isChecked ? "Realizado" : "Pendiente",
    };

    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podrás revertir los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Modificar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setSpinnner(true)
        dispatch(updateData('/pedidos', pedidoUpdated, id)).then(() => {
          setSpinnner(false)
          navigate('/pedidos');
        })
      }
    });
  };

  return (
    <div>
      <Container className="py-5">
        <h1>Modificar Pedido</h1>
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
                  Realizado
                </label>)
                : (
                  <label className="form-check-label" htmlFor="defaultCheck1">
                    Pendiente
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

export default PedidoAdminEdit;