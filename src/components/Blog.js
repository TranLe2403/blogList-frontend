import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BlogStyle = styled.div`
  border: solid;
  border-radius: 20px;
  border-width: 1px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 50px;
  background: white;
`;

const Blog = ({ blog }) => {
  return (
    <BlogStyle>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </BlogStyle>
  );
};

export default Blog;
