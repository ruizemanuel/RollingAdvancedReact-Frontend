import React, { useEffect, useState } from "react";
import { Container, Form, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const ProductsHistory = () => {

    const { loading, data: productsHistory } = useSelector(state => state.app);

    return (
        <div>
            <Container className="py-5 containerTable">
                <div className="d-flex align-items-center justify-content-between">
                    <h1>Historial de productos</h1>
                </div>
                <hr />
                {productsHistory?.length !== 0 ?
                    loading ? (
                        <div class="text-center " >
                            <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <Table bordered hover responsive className="align-middle mt-3 ">
                            <thead>
                                <tr>
                                    <th>Usuario</th>
                                    <th>Descripción</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productsHistory?.map((productHistory) => {
                                    const getDate = () => {
                                        if (productHistory && productHistory.createdAt) {
                                            const date = productHistory.createdAt.split('T')[0].split('-');
                                            const formattedDate = date[2] + "-" + date[1] + "-" + date[0];
                                            return formattedDate;
                                        }
                                        return 'Fecha no disponible';
                                    }
                                    return <tr key={productHistory._id}>
                                        <td>{productHistory.createdBy}</td>
                                        <td>{productHistory.message} {productHistory.productName}</td>
                                        <td>{getDate()}</td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>

                    )
                    :
                    <div className="no-products-found d-flex align-items-center justify-content-center">
                        <h1>🍕 Historial no disponible 🍕</h1>
                    </div>
                }
            </Container >
        </div >
    );
};

export default ProductsHistory;

