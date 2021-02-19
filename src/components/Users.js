import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
  const getUsers = useSelector((state) => state.users);

  if (!getUsers) return null;

  return (
    <div>
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            <th style={{ paddingLeft: 10 }}>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {getUsers.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <Link
                    to={`/users/${user.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {user.name}
                  </Link>
                </td>
                <td style={{ textAlign: "center" }}>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
