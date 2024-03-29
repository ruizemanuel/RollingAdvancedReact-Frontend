import React, { useEffect, useRef, useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  validateCategory,
  validateDescription,
  validatePrice,
  validateProductName,
  validateStock,
  validateUrl,
} from "../../helpers/validateFields";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../../share/domain/services/appServices";

const ProductEdit = ({ URL, getApi }) => {
  const [spinner, setSpinnner] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  const { dataToEdit: product } = useSelector(state => state.app);
  const [localCategory, setLocalCategory] = useState(product?.category);
  const { id } = useParams();
  const productNameRef = useRef('');
  const priceRef = useRef('');
  const stockRef = useRef('');
  const descriptionRef = useRef('');
  const urlImgRef = useRef('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!product) {
      return navigate('/products');
    }
  }, [product])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateProductName(productNameRef.current.value) !== 'ok') {
      Swal.fire("Error!", `${validateProductName(productNameRef.current.value)}`, "error");
      return;
    } else if (validatePrice(priceRef.current.value) !== 'ok') {
      Swal.fire("Error!", `${validatePrice(priceRef.current.value)}`, "error");
      return;
    } else if (validateStock(stockRef.current.value) !== 'ok') {
      Swal.fire("Error!", `${validateStock(stockRef.current.value)}`, "error");
      return;
    }
    else if (validateDescription(descriptionRef.current.value) !== 'ok') {
      Swal.fire("Error!", `${validateDescription(descriptionRef.current.value)}`, "error");
      return;
    } else if (validateUrl(urlImgRef.current.value) !== 'ok') {
      Swal.fire("Error!", `${validateUrl(urlImgRef.current.value)}`, "error");
      return;
    } else if (validateCategory(product.category) !== 'ok') {
      Swal.fire("Error!", `${validateCategory(product.category)}`, "error");
      return;
    }

    const productUpdated = {
      productName: productNameRef.current.value,
      price: priceRef.current.value,
      stock: stockRef.current.value,
      description: descriptionRef.current.value,
      urlImg: urlImgRef.current.value,
      category: localCategory,
    };

    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podrás revertir los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Modificar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(updateData('/products', productUpdated, id)).then(() => {
          navigate('/products');
        })
      }
    });
  };

  return (
    <div>
      <Container className="py-5">
        <h1>Modificar Plato</h1>
        <hr />
        <Form
          className="my-5"
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nombre*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: burger"
              defaultValue={product?.productName}
              ref={productNameRef}
              required
              maxLength={100}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Precio*</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej: 50"
              defaultValue={product?.price}
              ref={priceRef}
              required
              maxLength={6}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Stock*</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej: 500"
              defaultValue={product?.stock}
              ref={stockRef}
              required
              maxLength={5}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Descripción*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Inserte la descripción del producto"
              defaultValue={product?.description}
              ref={descriptionRef}
              required
              maxLength={200}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>URL de la imagen*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: https://media.istockphoto.com/photos/two-freshly-baked-french-id1277579771?k=20"
              defaultValue={product?.urlImg}
              ref={urlImgRef}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Categoría*</Form.Label>
            <Form.Select
              value={localCategory}
              onChange={({ target }) => setLocalCategory(target.value)}
            >
              <option value="">Selecciona una categoría</option>
              <option value="pizzas">Pizzas</option>
              <option value="hamburguesas">Hamburguesas</option>
              <option value="bebidas">Bebidas</option>
              <option value="postres">Postres</option>
            </Form.Select>
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
              <button className="delete-btn text-light">Actualizar</button>
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

export default ProductEdit;
