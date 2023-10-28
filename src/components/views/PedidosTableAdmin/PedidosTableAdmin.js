import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import PedidoAdmin from "./PedidoAdmin/PedidoAdmin";
import axios from "../../../config/axiosInit"
import { useSelector } from "react-redux";
import CustomDatePicker from "../../DatePicker";

const PedidosTableAdmin = () => {

  const { data: pedidos } = useSelector(state => state.app);

  return (
    <div>
      <Container className="py-5 pedidosContainerAdm">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Pedidos</h1>
          <CustomDatePicker/>
        </div>
        <hr />
        {/* Table of products */}
        {pedidos?.length !== 0 ?
          <Table bordered hover responsive className="align-middle mt-3">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Productos</th>
                <th>Total</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidos?.map((pedido) => (
                <PedidoAdmin
                  key={pedido._id}
                  pedido={pedido}
                />
              ))}
            </tbody>
          </Table>
          :
          <div className="no-products-found d-flex align-items-center justify-content-center">
            {/* No products found message */}
            <h1>🍕 No se encontraron pedidos 🍕</h1>
          </div>
        }
      </Container>
    </div>
  );
};

export default PedidosTableAdmin;
