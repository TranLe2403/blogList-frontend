const loginReducer = (state = "", action) => {
  switch (action.type) {
    case "SIGNED_IN":
      const targetUser = state.find(
        (user) => action.username === user.username
      );
      console.log(targetUser);
      return targetUser;
    default:
      return state;
  }
};

export const signedinUser = (username) => {
  return (dispatch) => {
    dispatch({
      type: "SIGNED_IN",
      username,
    });
  };
};

export default loginReducer;
