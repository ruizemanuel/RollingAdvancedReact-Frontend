import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getDataToEdit } from "../../../../share/domain/services/appServices";
import { Dropdown } from "react-bootstrap";
import Loader from "../../../layouts/Loader";


const PedidoAdmin = ({ pedido, URL, getApi }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getDate = () => {
    if (pedido && pedido.date) {
      const date = pedido.date.split('T')[0].split('-');
      const formattedDate = date[2] + "-" + date[1] + "-" + date[0];
      return formattedDate;
    }
    return 'Fecha no disponible';
  }

  

  const handleEdit = (id) => {
    dispatch(getDataToEdit('/pedidos', id)).then(() => {
      navigate(`/pedido/edit/${pedido._id}`)
    })

  };


  return (
    <tr>
      <td>{pedido.email}</td>
      <td><Dropdown>
        <Dropdown.Toggle variant="danger" id="dropdown-basic">
          Productos
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {pedido?.pedido?.map((item) => <Dropdown.Item style={{pointerEvents: 'none'}}>{item.productName}</Dropdown.Item>)}
        </Dropdown.Menu>
      </Dropdown></td>
      <td>{pedido.total}</td>
      <td>{getDate()}</td>
      <td>{pedido.estado}</td>

      <td className="w-25">
        <div className="d-flex justify-content-center">

          {pedido.estado === 'Pendiente' || pedido.estado === 'Realizado' ?
            (
              <button
                className="update-btn mx-1"
                onClick={() => handleEdit(pedido._id)}
              >
                Modificar
              </button>
            ) : (
              <div className="update-btn mx-1 text-decoration-none text-center">
                Esperando al usuario
              </div>
            )
          }



        </div>
      </td>
    </tr>
  );
};

export default PedidoAdmin;
