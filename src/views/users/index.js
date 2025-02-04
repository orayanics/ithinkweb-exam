import React, { useEffect, useState, useContext } from "react";
import { Container, Table, Button } from "reactstrap";
import { Link, useLocation } from "react-router-dom";

import { UsersContext } from "../../util/UsersProvider";

function Index() {
  const { users } = useContext(UsersContext);
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedUsers, setPaginatedUsers] = useState([]);

    if (editUser) {
  const perPage = 10;

  const paginateUsers = (page) => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedData = users.slice(start, end);
    setPaginatedUsers(paginatedData);
  };

  const handlePageTurn = () => {
    if (currentPage * perPage < users.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    paginateUsers(currentPage);
  }, [currentPage, users]);

  return (
    <Container>
      <div className="mt-3 text-right">
        <Link
          to={{
            pathname: `/users/create`,
            state: { background: location },
          }}
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
          {paginatedUsers.map((user) => (
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
                    to={{
                      pathname: `/users/${user.id}/edit`,
                      state: { background: location },
                    }}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <Button color="info">Edit</Button>
                  </Link>

                  <Link
                    to={{
                      pathname: `/users/${user.id}/delete`,
                      state: { background: location },
                    }}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <Button color="danger">Delete</Button>
                  </Link>
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
