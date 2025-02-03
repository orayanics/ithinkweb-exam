import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "reactstrap";

function Index() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // get all users 10 per page and get the other 2 users

    fetch("https://reqres.in/api/users?per_page=10")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data.data);
      });
  }, []);

  return (
    <Container>
      <div className="mt-3 text-right">
        <Button color="primary">+ Add User</Button>
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
            <th />
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
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
                  <Button color="info">Edit</Button>{" "}
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
