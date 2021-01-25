import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const blogFormRef = useRef();

  const orderBlogByLikes = (blogs) => {
    let blogA = 0;
    let blogB = 0;

    return blogs.sort((a, b) => {
      blogA = a.likes;
      blogB = b.likes;

      return blogA > blogB ? -1 : blogA < blogB ? 1 : 0;
    });
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      console.log("result: ", blogs);
      setBlogs(orderBlogByLikes(blogs));
    });
  }, []);

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
      handleSetMessage("Wrong username or password");
    }
  };

  const handleSetMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };

  const updateLikes = (index) => {
    const blogsCopy = [...blogs];

    const changedInfo = {
      user: blogsCopy[index].user.id,
      likes: blogsCopy[index].likes + 1,
      author: blogsCopy[index].author,
      title: blogsCopy[index].title,
      url: blogsCopy[index].url,
    };

    blogService
      .likesUpdate(blogsCopy[index].id, changedInfo)
      .then((response) => {
        setBlogs(
          blogsCopy.map((blog) =>
            blog.id !== blogsCopy[index].id ? blog : response
          )
        );
        handleSetMessage(
          `Blog "${response.title}" has been updated successfully!`
        );
      })
      .catch((_) => {
        handleSetMessage(`Updating failed!`);
      });
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

  const handleCreateBlog = (blogObject) => {
    const blogsCopy = [...blogs];
    blogFormRef.current.toggleVisibility(); //using ref to hide blog form after adding a blog
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        const allBlogs = blogsCopy.concat(returnedBlog);
        setBlogs(allBlogs);
        handleSetMessage(
          `A new blog ${blogObject.title} by ${blogObject.author}`
        );
      })
      .catch((err) => {
        handleSetMessage(err.response.data.error);
      });
  };

  const createBlogForm = () => (
    <Togglable buttonLabel="Create blog" ref={blogFormRef}>
      <BlogForm handleCreateBlog={handleCreateBlog} />
    </Togglable>
  );

  const deleteBlogHandler = async (index) => {
    const deleteConfirm = window.confirm(
      `Delete blog ${blogs[index].title} by ${blogs[index].author} ?`
    );

    const blogsCopy = [...blogs];

    if (!deleteConfirm) return;
    await blogService.deleteBlog(blogsCopy[index].id);

    blogsCopy.splice(index, 1);
    setBlogs(blogsCopy);
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <h2>blogs</h2>
          {createBlogForm()}
          <br />
          {blogs.map((blog, index) => (
            <Blog
              key={index}
              blog={blog}
              updateLikes={() => updateLikes(index)}
              deleteBlogHandler={() => deleteBlogHandler(index)}
              username={user.name}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
