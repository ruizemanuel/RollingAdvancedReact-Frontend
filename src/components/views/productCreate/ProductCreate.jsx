import React, { useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  validateProductName,
  validatePrice,
  validateStock,
  validateDescription,
  validateUrl,
  validateCategory,
} from "../../helpers/validateFields";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNewData, getData } from "../../../share/domain/services/appServices";

const ProductCreate = () => {


  const [inputs, setInputs] = useState({});
  const [spinner, setSpinnner] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  const { loading } = useSelector(state => state.app);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateProductName(inputs.productName) !== 'ok') {
      Swal.fire("Error!", `${validateProductName(inputs.productName)}`, "error");
      return;
    } else if (validatePrice(inputs.price) !== 'ok') {
      Swal.fire("Error!", `${validatePrice(inputs.price)}`, "error");
      return;
    } else if (validateStock(inputs.stock) !== 'ok') {
      Swal.fire("Error!", `${validateStock(inputs.stock)}`, "error");
      return;
    }
    else if (validateDescription(inputs.description) !== 'ok') {
      Swal.fire("Error!", `${validateDescription(inputs.description)}`, "error");
      return;
    } else if (validateUrl(inputs.urlImg) !== 'ok') {
      Swal.fire("Error!", `${validateUrl(inputs.urlImg)}`, "error");
      return;
    } else if (validateCategory(inputs.category) !== 'ok') {
      Swal.fire("Error!", `${validateCategory(inputs.category)}`, "error");
      return;
    }

    const newProduct = {
      productName: inputs.productName,
      price: inputs.price,
      stock: inputs.stock,
      description: inputs.description,
      urlImg: inputs.urlImg,
      category: inputs.category,

    };

    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podrás revertir los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Guardar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(createNewData('/products', newProduct)).then(() => {
          e.target.reset();
          navigate("/products");
        })


      }
    });
  };

  return (
    <div>
      <Container className="py-5">
        <h1>Agregar Plato</h1>
        <hr />
        <Form className="my-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nombre*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Café"
              name="productName"
              value={inputs.productName || ""}
              onChange={(e) => handleChange(e)}
              required
              maxLength={100}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Precio*</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej: 50"
              name="price"
              value={inputs.price || ""}
              onChange={(e) => handleChange(e)}
              required
              maxLength={6}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Stock*</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej: 500"
              name="stock"
              value={inputs.stock || ""}
              onChange={(e) => handleChange(e)}
              required
              maxLength={5}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Descripción*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Inserte la descripción del producto"
              name="description"
              value={inputs.description || ""}
              onChange={(e) => handleChange(e)}
              required
              maxLength={200}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>URL de la imagen*</Form.Label>
            <Form.Control
              type="text"
              name="urlImg"
              value={inputs.urlImg || ""}
              placeholder="Ej: https://media.istockphoto.com/photos/two-freshly-baked-french-id1277579771?k=20"
              onChange={(e) => handleChange(e)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Categoría*</Form.Label>
            <Form.Select
              name="category"
              value={inputs.category || ""}
              onChange={(e) => handleChange(e)}
            >
              <option value="">Selecciona una categoría</option>
              <option value="pizzas">Pizzas</option>
              <option value="hamburguesas">Hamburguesas</option>
              <option value="bebidas">Bebidas</option>
              <option value="postres">Postres</option>
            </Form.Select>
          </Form.Group>


          {loading ? (

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

export default ProductCreate;
