import userService from "../services/users";

const userReducer = (state = "", action) => {
  switch (action.type) {
    case "GET_ALL":
      return action.data;
    default:
      return state;
  }
};

export const initialUsers = () => {
  return async (dispatch) => {
    const users = await userService.allUsers();
    dispatch({
      type: "GET_ALL",
      data: users,
    });
  };
};

export default userReducer;
