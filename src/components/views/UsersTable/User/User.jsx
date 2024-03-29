import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDataToEdit } from "../../../../share/domain/services/appServices";


const User = ({ user }) => {

  const { email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    dispatch(getDataToEdit('/users', id)).then(() => {
      navigate(`/user/edit/${id}`)
    })
    
  };

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.activo ? 'activo' : 'inactivo'}</td>
      <td>{user?.roles?.map((rol, i) => <div key={i}>{rol}</div>)}</td>
      

      <td className="w-25">
        <div className="d-flex justify-content-center">

          {user.email !== email ? (

            <button
              onClick={() => handleEdit(user._id)}
              className="update-btn mx-1"
            >
              Modificar
            </button>

          ) : (

            <div className="update-btn mx-1 text-decoration-none text-center">
              No es posible editar
            </div>

          )}



        </div>
      </td>
    </tr>
  );
};

export default User;
