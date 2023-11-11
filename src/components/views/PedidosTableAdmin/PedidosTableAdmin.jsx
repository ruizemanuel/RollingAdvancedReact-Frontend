import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import PedidoAdmin from "./PedidoAdmin/PedidoAdmin";
import axios from "../../../config/axiosInit"
import { useSelector } from "react-redux";
import CustomDatePicker from "../../DatePicker";

const PedidosTableAdmin = () => {

  const { data: pedidos } = useSelector(state => state.app);
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);

  const filterPedidosByDate = (pedidos, dateRange) => {
    
    if (!dateRange[0] || !dateRange[1]) {
      return pedidos;
    }
    const [startDate, endDate] = dateRange;
    const filteredPedidos = pedidos.filter((pedido) => {
      const pedidoDate = new Date(pedido.date);
      return pedidoDate >= startDate && pedidoDate <= endDate;
    });
    return filteredPedidos
  };

  return (
    <div>
      <Container className="py-5 pedidosContainerAdm">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Pedidos</h1>
        </div>
        <hr />
        <CustomDatePicker onDateChange={setSelectedDateRange}/>
        {filterPedidosByDate(pedidos, selectedDateRange).length !== 0 ?
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
              {filterPedidosByDate(pedidos, selectedDateRange)?.map((pedido) => (
                <PedidoAdmin
                  key={pedido._id}
                  pedido={pedido}
                />
              ))}
            </tbody>
          </Table>
          :
          <div className="no-products-found d-flex align-items-center justify-content-center">
            <h1>🍕 No se encontraron pedidos 🍕</h1>
          </div>
        }
      </Container>
    </div>
  );
};

export default PedidosTableAdmin;
