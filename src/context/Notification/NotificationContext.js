import { useReducer, createContext } from "react";
import NotificationReducer from "./NotificationReducer";

const INITIAL_STATE = {
    notification: "",
    error: false,
};

export const NotificationContext = createContext(INITIAL_STATE);

export const NotificationContextProvider = ({ children }) => {
    // const [state, dispatch] = useReducer(NotificationReducer, INITIAL_STATE);
    const [state, dispatchNotification] = useReducer(NotificationReducer, INITIAL_STATE);
    
  return (
    <NotificationContext.Provider value={{ notification: state.notification, error: state.error, dispatchNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
