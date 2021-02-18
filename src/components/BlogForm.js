import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../reducers/bloglistReducer";
import { notificationContent } from "../reducers/notiReducer";
import Typography from "../Typography";

import Togglable from "./Togglable";

import styled from "styled-components";

const TextField = styled.input`
  margin: 10px;
  width: 60%;
  border: none;
  background-color: transparent;
  border-bottom: thin solid black;
  outline: none;
`;

const InputContainer = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
`;

const BlogFormCreation = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const handleCreateBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility(); //using ref to hide blog form after adding a blog
    dispatch(addBlog(blogObject));

    dispatch(
      notificationContent(
        `A new blog ${blogObject.title} by ${blogObject.author}`,
        5
      )
    );
  };

  return (
    <Togglable buttonLabel="Create blog" ref={blogFormRef}>
      <BlogForm handleCreateBlog={handleCreateBlog} />
    </Togglable>
  );
};

export const BlogForm = ({ handleCreateBlog }) => {
  const [blogInfo, setBlogInfo] = useState({ title: "", author: "", url: "" });

  const addBlog = (event) => {
    event.preventDefault();
    handleCreateBlog(blogInfo);

    setBlogInfo({ title: "", author: "", url: "" });
  };

  return (
    <form onSubmit={addBlog}>
      <InputContainer>
        <p>Title:</p>
        <TextField
          id="title"
          type="text"
          value={blogInfo.title}
          name="Title"
          onChange={({ target }) =>
            setBlogInfo({ ...blogInfo, title: target.value })
          }
        />
      </InputContainer>
      <InputContainer>
        <p>Author:</p>
        <TextField
          id="author"
          type="text"
          value={blogInfo.author}
          name="Author"
          onChange={({ target }) =>
            setBlogInfo({ ...blogInfo, author: target.value })
          }
        />
      </InputContainer>
      <InputContainer>
        <p>URL:</p>
        <TextField
          id="url"
          type="text"
          value={blogInfo.url}
          name="Url"
          onChange={({ target }) =>
            setBlogInfo({ ...blogInfo, url: target.value })
          }
        />
      </InputContainer>
      <br />
      <Typography buttonType="create" id="create-button" type="submit">
        Create
      </Typography>
    </form>
  );
};

export default BlogFormCreation;
