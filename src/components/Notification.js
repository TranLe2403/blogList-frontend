import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Message = styled.div`
  color: ${(props) => (props.isError ? "red" : "green")};
  background: lightgrey;
  font-size: 20px;
  border-style: solid;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const Notification = () => {
  const message = useSelector((state) => state.notification);

  if (!message) {
    return null;
  }
  const isError = message && message.includes("Wrong");

  return (
    <Message isError={isError} className="error">
      {message}
    </Message>
  );
};

export default Notification;
