import React, { createContext, useState, useEffect } from "react";

export const UsersContext = createContext();

export default function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async (currentPage = 1) => {
    const response = await fetch(`https://reqres.in/api/users?per_page=12`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    setUsers(data.data);

    setLoading(false);
  };

  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);

    console.log(users);
  };

  const editUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      )
    );
  };

  const deleteUser = async (id) => {
    console.log(users);
    console.log(id);

    const response = await fetch(`https://reqres.in/api/users/${id}`, {
      method: "DELETE",
    });

    console.log(response.status);

    if (response.status === 204) {
      setUsers(users.filter((item) => item.id !== id));
    }
  };

  return (
    <UsersContext.Provider
      value={{ users, loading, setLoading, addUser, editUser, deleteUser }}
    >
      {children}
    </UsersContext.Provider>
  );
}
