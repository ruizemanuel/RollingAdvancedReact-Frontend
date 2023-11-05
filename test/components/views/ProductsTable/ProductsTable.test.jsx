import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ProductsTable from "../../../../src/components/views/ProductsTable/ProductsTable";
import { BrowserRouter } from "react-router-dom";
import { products } from "../../../fixtures/constants";

const mockStore = configureStore([]);
const initialState = {
  app: {
    loading: false,
    data: products
  },
};

describe("TEST - COMPONENT <ProductsTable />", () => {
  test("CONTROL - Validar la estructura del componente", () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductsTable />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText("Cafe"))
  });

});
