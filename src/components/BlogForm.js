import React, { useState } from "react";

const BlogForm = ({ handleCreateBlog }) => {
  const [blogInfo, setBlogInfo] = useState({ title: "", author: "", url: "" });

  const addBlog = (event) => {
    event.preventDefault();
    handleCreateBlog(blogInfo);

    setBlogInfo({ title: "", author: "", url: "" });
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        Title
        <input
          id="title"
          type="text"
          value={blogInfo.title}
          name="Title"
          onChange={({ target }) =>
            setBlogInfo({ ...blogInfo, title: target.value })
          }
        />
      </div>
      <div>
        Author
        <input
          id="author"
          type="text"
          value={blogInfo.author}
          name="Author"
          onChange={({ target }) =>
            setBlogInfo({ ...blogInfo, author: target.value })
          }
        />
      </div>
      <div>
        URL
        <input
          id="url"
          type="text"
          value={blogInfo.url}
          name="Url"
          onChange={({ target }) =>
            setBlogInfo({ ...blogInfo, url: target.value })
          }
        />
      </div>
      <br />
      <button id="create-button" type="submit">
        Create
      </button>
    </form>
  );
};

export default BlogForm;
