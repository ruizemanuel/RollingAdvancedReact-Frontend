import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getDataToEdit } from "../../../../share/domain/services/appServices";


const PedidoAdmin = ({ pedido, URL, getApi }) => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleEdit = (id) => {
    dispatch(getDataToEdit('/pedidos', id)).then(() => {
      navigate(`/pedido/edit/${pedido._id}`)
    })

  };


  return (
    <tr>
      <td>{pedido.email}</td>
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
