import React, { useState } from "react";
import { Container } from "react-bootstrap";
import BarsChart from "../../charts/BarsChart";
import PedidosTableAdmin from "../PedidosTableAdmin/PedidosTableAdmin";

const Home = () => {

  return (
    <div>
      <Container className="py-5 ">
        <h1 className="display-4 text-center">Estadisticas <span>de venta</span></h1>
        <div>
        <div className="bg-light mx-auto px-2 border border-1 border-dark" style={{ width: "75%", height: "50%" }}>
          <BarsChart />
        </div>
      </div>
        <hr />
        <PedidosTableAdmin />
      </Container>
    </div>
  );
};

export default Home;
