import React, { useState } from "react";
const Blog = ({ blog, updateLikes, deleteBlogHandler, username }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [detailVisible, setDetailVisible] = useState(false);

  const toggleVisibility = () => {
    setDetailVisible(!detailVisible);
  };

  return (
    <div style={blogStyle}>
      <div>
        <span id="title">
          {blog.title} {blog.author}
        </span>
        <button id="view-or-hide" onClick={toggleVisibility}>
          {detailVisible ? "Hide" : "View"}
        </button>
      </div>
      {detailVisible && (
        <div className="blogDetails">
          <p>url: {blog.url}</p>
          <p id="like-numbers">
            Likes: <span id="likes">{blog.likes}</span>
            <button id="like-button" onClick={updateLikes}>
              Like
            </button>
          </p>
          <p>{blog.user.name}</p>
          {username === blog.user.name && (
            <button id="delete-button" onClick={deleteBlogHandler}>
              Delete Blog
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
