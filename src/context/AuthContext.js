import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

let INITIAL_STATE = {
    currentUser: JSON.parse(localStorage.getItem('user')) || null,
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    // Store the loggedIn user in Localhost so that when we refresh our page it dosn't log us out
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.currentUser));
    }, [state.currentUser]); // Whenever current user changes update it in the localstorage

    return (
        <AuthContext.Provider value = {{currentUser: state.currentUser, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
