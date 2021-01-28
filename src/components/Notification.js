import React from "react";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  const isError = message && message.includes("Wrong");
  const messageStyle = {
    color: isError ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return (
    <div>
      <div className="error" style={messageStyle}>
        {message}
      </div>
      <br />
    </div>
  );
};

export default Notification;
