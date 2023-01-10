import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import "./style.navbar.css";

const Navbar = () => {
  const { currentUser, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("Logout");
    try {
      // await firebase.auth().signOut()
      dispatch({type: "LOGOUT",})
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <div className="navbar-container">
      <div className="">
        <div className="logo"></div>
      </div>
      <div className="nav-links">
        <Link to="/">
          <div className="nav-link">Home</div>
        </Link>
        {currentUser && (
          <Link to="/">
            <div className="nav-link">{currentUser?.user?.displayName || currentUser?.email?.split("@")[0]}</div>
          </Link>
        )}
        {currentUser ? (
          <div className="nav-link" onClick={handleLogout}>Logout</div>
        ) : (
          <Link to="/login">
            <div className="nav-link">Login</div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;

