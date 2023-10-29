import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../../config/axiosInit"
import { useDispatch } from "react-redux";
import { deleteItem, getData, getDataToEdit } from "../../../../share/domain/services/appServices";

const Product = ({ product, URL, getApi, getSpinner }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleEdit = (id) => {
    dispatch(getDataToEdit('/products', id)).then(() => {
      navigate(`/product/edit/${product._id}`)
    })
    
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No podrás revertir los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteItem('/products', id))
        .then(() => {
          dispatch(getData('/products'))
        })
      }
    })
  };

  return (

      <tr>
        <td>{product.productName}</td>
        <td>${product.price}</td>
        <td>{product.stock}</td>
        <td>
          <p className="truncate-img-link m-0">{product.urlImg}</p>
        </td>
        <td>{product.category}</td>
        <td>{product.description}</td>
        <td className="w-25">
          <div className="d-flex justify-content-center">

            <button
              className="update-btn mx-1"
              onClick={() => handleEdit(product._id)}
            >
              Modificar
            </button>



            <button
              className="delete-btn mx-1"
              onClick={() => handleDelete(product._id)}
            >
              Borrar
            </button>


          </div>
        </td>
      </tr>
    


  );
};

export default Product;
