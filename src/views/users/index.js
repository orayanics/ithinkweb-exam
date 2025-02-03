import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "reactstrap";
import { Link, useLocation } from "react-router-dom";

import UserAddModal from "../../components/Users/UserAddModal";
import UserEditModal from "components/Users/UserEditModal";

function Index() {
  const [users, setUsers] = useState({ data: [], page: 1, total_pages: 1 });
  const [selectedUser, setSelectedUser] = useState([]);
  const location = useLocation();

  const getUsers = async (currentPage = 1, addUser = null, editUser = null) => {
    const response = await fetch(
      `https://reqres.in/api/users?page=${currentPage}&per_page=10`
    );
    const data = await response.json();
    if (addUser) {
      data.data.push(addUser);
    }

    if (editUser) {
      data.data = data.data.map((user) =>
        user.id === editUser.id ? { ...user, ...editUser } : user
      );
    }

    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handlePageTurn = (number) => {
    const newPage = users.page + number;
    if (newPage < 1 || newPage > users.total_pages) {
      return;
    }
    getUsers(newPage);
  };

  return (
    <Container>
      <div className="mt-3 text-right">
        <Link
          to="/users/create"
          style={{ color: "white", textDecoration: "none" }}
        >
          <Button color="primary">+ Add User</Button>
        </Link>

        <Button color="primary" onClick={() => handlePageTurn(1)}>
          + Next
        </Button>
        <Button color="primary" onClick={() => handlePageTurn(-1)}>
          + Back
        </Button>
      </div>

      {location.pathname === "/users/create" && (
        <UserAddModal onUserAdd={(newUser) => getUsers(users.page, newUser)} />
      )}

      {location.pathname.match(/^\/users\/\d+\/edit$/) && (
        <UserEditModal
          userData={selectedUser}
          onEditUser={(editedUser) => getUsers(users.page, null, editedUser)}
        />
      )}

      <Table className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Profile</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.data.map((user) => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>
                <img src={user.avatar} alt={user.first_name} />
              </td>
              <td>{user.email}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>
                <div>
                  <Link
                    to={`/users/${user.id}/edit`}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <Button color="info" onClick={() => setSelectedUser(user)}>
                      Edit
                    </Button>
                  </Link>
                  <Button color="danger">Delete</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Index;
