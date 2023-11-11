import React, { useState } from "react";
import { Container, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import User from "./User/User";
import { useSelector } from "react-redux";
import SearchBar from "../../layouts/SearchBar";

const UsersTable = () => {

  const { data: users } = useSelector(state => state.app);
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearch = (searchTerm) => {
    const filtered = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredUsers(filtered);
  };

  const handleChange = (searchTerm) => {
    const filtered = users.filter(user => user.roles.includes(searchTerm.target.value));
    setFilteredUsers(filtered);
  };

  return (
    <div>
      <Container className="py-5 userContainer">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Administrar usuarios</h1>
          <Link
            to="/user/create"
            className="delete-btn text-decoration-none text-center"
          >
            Agregar usuario
          </Link>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <SearchBar data={users} onSearch={handleSearch} setFilteredData={setFilteredUsers} />
          <Form.Select onChange={handleChange} className="w-25">
            <option disabled selected>Filtrar por rol</option>
            <option value="user">Usuario</option>
            <option value="admin">Admin</option>
          </Form.Select>
        </div>

        {filteredUsers?.length !== 0 ?
          <Table bordered hover responsive className="align-middle mt-3">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Estado</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user) => (
                <User
                  key={user._id}
                  user={user}
                />
              ))}
            </tbody>
          </Table>
          :
          <div className="no-products-found d-flex align-items-center justify-content-center">
            <h1>🍕 No se encontraron usuarios 🍕</h1>
          </div>
        }
      </Container>
    </div>
  );
};

export default UsersTable;
