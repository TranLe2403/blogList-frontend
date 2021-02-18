import bloglistService from "../services/blogs";

const bloglistReducer = (state = [], action) => {
  switch (action.type) {
    case "LIKES":
      const foundBlog = state.find((blog) => blog.id === action.data.noteId);
      const updatedBlog = {
        ...foundBlog,
        likes: ++foundBlog.likes,
      };
      const newState = state.map((blog) =>
        blog.id === foundBlog.id ? updatedBlog : blog
      );
      return newState;
    case "ADD_COMMENT":
      const targetBlog = state.find((note) => note.id === action.data.noteId);
      const changedBlog = {
        ...targetBlog,
        comments: targetBlog.comments.concat(action.data.comment),
      };
      const newObj = state.map((note) =>
        note.id === targetBlog.id ? changedBlog : note
      );
      return newObj;

    case "CREATE":
      return state.concat(action.data);
    case "INIT_ANECDOTES":
      return action.data;
    case "DELETE":
      return state.filter((item) => item.id !== action.data.noteId);
    default:
      return state;
  }
};

export const likeBlog = (id, updatedBlog) => {
  return async (dispatch) => {
    try {
      await bloglistService.likesUpdate(id, updatedBlog);
      dispatch({
        type: "LIKES",
        data: { noteId: id },
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const blogDeletion = (id) => {
  return async (dispatch) => {
    try {
      await bloglistService.deleteBlog(id);
      dispatch({
        type: "DELETE",
        data: { noteId: id },
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const addBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await bloglistService.create(content);
      dispatch({
        type: "CREATE",
        data: newBlog,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const addComment = (id, comment) => {
  return async (dispatch) => {
    try {
      await bloglistService.addComment(id, comment);
      dispatch({
        type: "ADD_COMMENT",
        data: { noteId: id, comment: comment },
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const initialBloglist = () => {
  return async (dispatch) => {
    try {
      const blogs = await bloglistService.getAll();
      dispatch({
        type: "INIT_ANECDOTES",
        data: blogs,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export default bloglistReducer;
