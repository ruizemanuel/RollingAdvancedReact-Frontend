import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/layouts/Navigation";
import Footer from "./components/layouts/Footer";
import ProductCreate from "./components/views/productCreate/ProductCreate";
import ProductEdit from "./components/views/productEdit/ProductEdit";
import Error404 from "./components/views/error404/Error404";
import Login from "./components/views/login/Login";
import Register from "./components/views/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import UserCreate from "./components/views/userCreate/userCreate";
import UserEdit from "./components/views/userEdit/userEdit";
import PedidoAdminEdit from "./components/views/PedidoAdminEdit/PedidoAdminEdit";
import HomeContainer from "./components/views/home/HomeContainer";
import ProductsContainer from "./components/views/ProductsTable/ProductsContainer";
import UsersContainer from "./components/views/UsersTable/UsersContainer";
import ProductsHistoryContainer from "./components/views/ProductsHistory/ProductsHistoryContainer";



function App() {

  return (
    <div>
      <BrowserRouter>
        <Navigation/>
        <main>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <ProtectedRoute>
                  <HomeContainer />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/products"
              element={
                <ProtectedRoute>
                  <ProductsContainer />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/product/create"
              element={
                <ProtectedRoute>
                  <ProductCreate />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/product/edit/:id"
              element={
                <ProtectedRoute>
                  <ProductEdit />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/product/history"
              element={
                <ProtectedRoute>
                  <ProductsHistoryContainer />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/users"
              element={
                <ProtectedRoute>
                  <UsersContainer />
                </ProtectedRoute>
              }
            />


            <Route
              exact
              path="/user/create"
              element={
                <ProtectedRoute>
                  <UserCreate />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/user/edit/:id"
              element={
                <ProtectedRoute>
                  <UserEdit />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/pedido/edit/:id"
              element={
                <ProtectedRoute>
                  <PedidoAdminEdit />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/auth/login/"
              element={<Login/>}
            />
            <Route exact path="/auth/register/" element={<Register />} />
            <Route exact path="*" element={<Error404 />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div >
  );





}

export default App;