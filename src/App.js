import React, { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import { notificationContent } from "./reducers/notiReducer";
import { useDispatch } from "react-redux";
import { initialBloglist } from "./reducers/bloglistReducer";
import { initialUsers } from "./reducers/userReducer";
import { Switch, Route, Link } from "react-router-dom";
import Users from "./components/Users";
import Blogs from "./components/Blogs";
import SingleUser from "./components/SingleUser";
import SingleBlog from "./components/SingleBlog";
import Typography from "./Typography";
import styled from "styled-components";
import "./App.css";

const UserCover = styled.div`
  display: flex;
  align-items: center;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: linear-gradient(#c6dea6, #7ebdc3, #7a6263);
  width: 100vw;
  height: 100vh;
`;

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialBloglist());
    dispatch(initialUsers());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("userInfo");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      localStorage.setItem("userInfo", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(notificationContent("Wrong username or password", 5));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel="Login">
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </Togglable>
    );
  };

  const padding = { paddingRight: 10 };

  return (
    <AppContainer>
      <h2>Blog Application</h2>
      <Notification />
      {!user ? (
        loginForm()
      ) : (
        <div style={{ width: 310 }}>
          <Link style={padding} to="/">
            Home
          </Link>
          <Link style={padding} to="/users">
            Users
          </Link>

          <UserCover>
            <p>{user.name} logged in</p>
            <Typography
              buttonType="cancel"
              id="logout-button"
              onClick={handleLogout}
            >
              Logout
            </Typography>
          </UserCover>
          <Switch>
            <Route path="/users/:id">
              <SingleUser />
            </Route>

            <Route path="/blogs/:id">
              <SingleBlog />
            </Route>

            <Route path="/users" exact>
              <Users />
            </Route>

            <Route path="/">
              <Blogs user={user} />
            </Route>
          </Switch>
        </div>
      )}
    </AppContainer>
  );
};

export default App;
