import React from "react";
import Blog from "./Blog";
import BlogFormCreation from "./BlogForm";
import { useSelector } from "react-redux";

const Blogs = ({ user }) => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      <h3>Blog list</h3>
      <BlogFormCreation />
      <br />
      <div id="all-blogs">
        {blogs.map((blog) => {
          return <Blog key={blog.id} blog={blog} username={user.name} />;
        })}
      </div>
    </div>
  );
};

export default Blogs;
