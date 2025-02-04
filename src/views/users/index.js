import React, { useEffect, useState, useContext, Suspense, use } from "react";
import { Container, Table, Button } from "reactstrap";
import { Link, useLocation } from "react-router-dom";

import { UsersContext } from "../../util/UsersProvider";
import styles from "./Users.module.scss";

import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

import Loader from "views/loader";

function Index() {
  const { users, loading } = useContext(UsersContext);
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedUsers, setPaginatedUsers] = useState([]);

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

  useEffect(() => {}, []);

  useEffect(() => {
    paginateUsers(currentPage);
  }, [currentPage, users]);

  return (
    <Container>
      <div className="d-flex justify-content-center justify-content-sm-start gap-2 mt-3 text-right">
        <Link
          to={{
            pathname: `/users/create`,
            state: { background: location },
          }}
          style={{ color: "white", textDecoration: "none" }}
        >
          <button className="delete-button rounded">
            <span className="d-flex align-items-center gap-2">
              <FaPlus /> Add User
            </span>
          </button>
        </Link>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <Table borderless hover responsive className="mt-3">
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
                <tr key={user.id} className={`${styles["td"]} rounded-circle`}>
                  <th scope="row" className="align-middle">
                    {user.id}
                  </th>
                  <td className="align-middle">
                    <img
                      className={`${styles["avatar-icon"]} rounded-circle`}
                      src={user.avatar}
                      alt={user.first_name}
                    />
                  </td>
                  <td className="align-middle">{user.email}</td>
                  <td className="align-middle">{user.first_name}</td>
                  <td className="align-middle">{user.last_name}</td>
                  <td className="align-middle">
                    <div className="d-flex gap-3 justify-content-start">
                      <Link
                        to={{
                          pathname: `/users/${user.id}/edit`,
                          state: { background: location },
                        }}
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        <button className="edit-button rounded">Edit</button>
                      </Link>

                      <Link
                        to={{
                          pathname: `/users/${user.id}/delete`,
                          state: { background: location },
                        }}
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        <button className="delete-button rounded">
                          Delete
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      <div className="d-flex justify-content-center justify-content-sm-start gap-2 my-3 text-right">
        <button
          className="edit-button rounded"
          onClick={() => handlePageTurn(1)}
        >
          {<FaArrowLeft />} Next
        </button>
        <button
          className="edit-button rounded"
          onClick={() => handlePageTurn(-1)}
        >
          Back {<FaArrowRight />}
        </button>
      </div>
    </Container>
  );
}

export default Index;
