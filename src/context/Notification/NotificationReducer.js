const NotificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_SUCCESS":{
        console.log("Showing success")
        return { ...state, notification: action.payload, error: false };
    }
    case "SHOW_ERROR":
      return { ...state, notification: action.payload, error: true };
    case "HIDE_NOTIFICATION":
      return { ...state, notification: "", error: false };
    default:
      return state;
  }
};

export default NotificationReducer;