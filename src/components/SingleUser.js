import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SingleUser = () => {
  const id = useParams().id;
  console.log("id:", id);
  const getUsers = useSelector((state) => state.users);
  if (!getUsers) {
    return null;
  }

  const getUserIndex = getUsers.findIndex((item) => (item.id === id));

  return (
    <div>
      <h2>{getUsers[getUserIndex].name}</h2>
      <p>
        <strong>Added blogs</strong>
      </p>
      {getUsers[getUserIndex].blogs.map((item) => {
        return <li key={item.id}>{item.title}</li>;
      })}
    </div>
  );
};

export default SingleUser;
