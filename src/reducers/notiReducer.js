const notiReducer = (state = "", action) => {
  switch (action.type) {
    case "NOTI":
      return action.notification;
    default:
      return state;
  }
};

let previousTimeout;

export const notificationContent = (message, timeout) => {
  return (dispatch) => {
    clearTimeout(previousTimeout);
    previousTimeout = setTimeout(() => {
      dispatch({
        type: "NOTI",
        notification: "",
      });
    }, timeout * 1000);

    dispatch({
      type: "NOTI",
      notification: message,
    });
  };
};

export default notiReducer;
