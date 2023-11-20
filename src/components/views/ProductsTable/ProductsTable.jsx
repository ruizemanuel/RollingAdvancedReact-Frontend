import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Product from "./Product/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faClose } from "@fortawesome/free-solid-svg-icons";
import useProductFilters from "../../../share/data/hooks/useProductFilters";

const ProductsTable = () => {

  const { loading, data: products } = useSelector(state => state.app);
  const [inputs, setInputs] = useState({});
  const {
    filteredProducts,
    filter,
    filterByCategory,
    filterByPrice,
    filterByStock,
    restoreFilters,
  } = useProductFilters(products);

  const handleChangePrice = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const restoreFiltersLocal = () => {
    document.getElementById("categoryFilter").selectedIndex = 0;
    document.getElementById("stockFilter").selectedIndex = 0;
    setInputs({})
    restoreFilters();
  }

  return (
    <div>
      <div className="py-5 px-5 containerTable">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Administrar Menú</h1>

          {loading ? (
            <div className="d-flex flex-wrap justify-content-end">
              <div className="delete-btn text-decoration-none text-center text-light mb-2 mb-lg-0">
                Historial
              </div>
              <div className="delete-btn text-decoration-none text-center text-light">
                Agregar un Menú
              </div>
            </div>

          ) : (
            <div className="d-flex flex-wrap justify-content-end">
              <Link
                to="/product/history"
                className="delete-btn text-decoration-none text-center text-light mb-2 mb-lg-0"
              >
                Historial
              </Link>
              <Link
                to="/product/create"
                className="delete-btn text-decoration-none text-center text-light"
              >
                Agregar un Menú
              </Link>

            </div>

          )}
        </div>
        <hr />
        <div className="d-flex gap-3 justify-content-lg-between align-items-lg-center flex-wrap">
          <Form.Select id="categoryFilter" onChange={(e) => filterByCategory(e.target.value)} className="w-25 mx-auto">
            <option disabled selected>Filtrar por Categoría</option>
            <option value="pizzas">Pizzas</option>
            <option value="hamburguesas">Hamburguesas</option>
            <option value="bebidas">Bebidas</option>
            <option value="postres">Postres</option>
          </Form.Select>
          <div className="d-flex align-items-center mx-auto">
            <h5>
              Precio:
            </h5>
            <Form.Group style={{ width: '100px' }} >
              <Form.Control
                type="number"
                placeholder="Minimo"
                name="min"
                value={inputs.min || ""}
                onChange={(e) => handleChangePrice(e)}
                maxLength={5}
              />
            </Form.Group>
            <h5>-</h5>
            <Form.Group style={{ width: '100px' }} >
              <Form.Control
                type="number"
                placeholder="Maximo"
                name="max"
                value={inputs.max || ""}
                onChange={(e) => handleChangePrice(e)}
                maxLength={5}
              />
            </Form.Group>
            <FontAwesomeIcon
              onClick={() => filterByPrice(inputs.min, inputs.max)}
              style={{ cursor: 'pointer' }}
              icon={faAngleRight}
              size="lg"
              className="ms-2"
              color={inputs.max || inputs.min ? "#000000" : "#c4b8b7"} />
          </div>


          <Form.Select id="stockFilter" onChange={(e) => filterByStock(e.target.value)} className="w-25 mx-auto">
            <option disabled selected>Filtrar por Stock</option>
            <option value="en-stock">En stock</option>
            <option value="sin-stock">Sin Stock</option>
          </Form.Select>

          {filter &&
            <div style={{ cursor: 'pointer' }} onClick={restoreFiltersLocal} className="d-flex align-items-center gap-2">
              Restaurar Filtros
              <FontAwesomeIcon
                icon={faClose}
                size="1x" />
            </div>}
        </div>

        {filteredProducts?.length !== 0 ?

          loading ? (

            <div className="text-center " >
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>

          ) : (

            <Table bordered hover responsive className="align-middle mt-3 ">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>URL de la imagen</th>
                  <th>Categoría</th>
                  <th className="product-description">Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>


                {filteredProducts?.map((product) => (
                  <Product
                    key={product._id}
                    product={product}
                  />
                ))}


              </tbody>
            </Table>

          )



          :
          <div className="no-products-found d-flex align-items-center justify-content-center">
            <h1>🍕 No hay productos disponibles 🍕</h1>
          </div>
        }
      </div >
    </div >
  );
};

export default ProductsTable;

