import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/views/home/Home";
import Navigation from "./components/layouts/Navigation";
import Footer from "./components/layouts/Footer";
import ProductsTable from "./components/views/ProductsTable/ProductsTable";
import ProductCreate from "./components/views/productCreate/ProductCreate";
import ProductEdit from "./components/views/productEdit/ProductEdit";
import Error404 from "./components/views/error404/Error404";
import Login from "./components/views/login/Login";
import Register from "./components/views/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "./config/axiosInit";
import ProductDetails from "./components/views/productDetails/ProductDetails";
import ProtectedRoute from "./routes/ProtectedRoute";
import UsersTable from "./components/views/UsersTable/UsersTable";
import UserCreate from "./components/views/userCreate/userCreate";
import UserEdit from "./components/views/userEdit/userEdit";
import PedidosTable from "./components/views/PedidosTable/PedidosTable";
import PedidosTableAdmin from "./components/views/PedidosTableAdmin/PedidosTableAdmin";
import PedidoAdminEdit from "./components/views/PedidoAdminEdit/PedidoAdminEdit";
import CreditCardValidator from "./components/views/creditCardValidator/creditCardValidator";
import HomeContainer from "./components/views/home/HomeContainer";
import ProductsContainer from "./components/views/ProductsTable/ProductsContainer";
import UsersContainer from "./components/views/UsersTable/UsersContainer";


function App() {
  const [products, setProducts] = useState([]);
  const [spinner, setSpinnner] = useState(false);
  const [loggedUser, setLoggedUser] = useState(localStorage.getItem('user-token') ? JSON.parse(localStorage.getItem("user-token")) : {});
  const URL = process.env.REACT_APP_API_HAMBURGUESERIA;

  return (
    <div>
      <BrowserRouter>
        <Navigation loggedUser={loggedUser} setLoggedUser={setLoggedUser} products={products} />
        <main>
          <Routes>
            <Route exact path="/" element={<HomeContainer />}/>
            <Route
              exact
              path="/products"
              element={
                  <ProtectedRoute loggedUser={loggedUser}>
                    <ProductsContainer />
                  </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/product/create"
              element={
                  <ProtectedRoute loggedUser={loggedUser}>
                    <ProductCreate />
                  </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/product/edit/:id"
              element={
                  <ProtectedRoute loggedUser={loggedUser}>
                    <ProductEdit />
                  </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/users"
              element={
                  <ProtectedRoute loggedUser={loggedUser}>
                    <UsersContainer />
                  </ProtectedRoute>
              }
            />


            <Route
              exact
              path="/user/create"
              element={
                <ProtectedRoute loggedUser={loggedUser}>
                  <UserCreate />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/user/edit/:id"
              element={
                <ProtectedRoute loggedUser={loggedUser}>
                  <UserEdit />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/pedidos/table"
              element={
                <ProtectedRoute loggedUser={loggedUser}>
                  <PedidosTableAdmin />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/pedido/edit/:id"
              element={
                <ProtectedRoute loggedUser={loggedUser}>
                  <PedidoAdminEdit />
                </ProtectedRoute>
              }
            />


            <Route
              exact
              path="/product/buy/:id"
              element={<ProductDetails URL={URL} />}
            />
            <Route
              exact
              path="/pedidos"
              element={<PedidosTable />}
            />
            <Route
              exact
              path="/pedidos/tarjeta/:id"
              element={<CreditCardValidator />}
            />
            <Route
              exact
              path="/auth/login/"
              element={<Login setLoggedUser={setLoggedUser} />}
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