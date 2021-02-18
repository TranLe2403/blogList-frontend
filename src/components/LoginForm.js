import React from "react";
import Typography from "../Typography";
import styled from "styled-components";

const InputCover = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  border: none;
  margin-left: 10px;
  background-color: transparent;
  border-bottom: thin solid black;
  outline: none;
`;

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <InputCover>
          <p>Username</p>
          <Input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </InputCover>
        <InputCover>
          <p>Password</p>
          <Input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </InputCover>
        <Typography buttonType="login" id="login-button" type="submit">
          Login
        </Typography>
      </form>
    </div>
  );
};

export default LoginForm;
