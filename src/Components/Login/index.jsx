import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../../firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

import { AuthContext } from "../../context/AuthContext";
import { NotificationContext } from "../../context/Notification/NotificationContext";

import styles from "./styles.module.css";

function Login({setIsUserAuthenticated}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const {dispatch} = useContext(AuthContext);
  const {dispatchNotification} = useContext(NotificationContext)

  const loginWithEmail = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in Successfully
        const user = userCredential.user;
        console.log(user);
        const userName = user?.email?.split("@")[0];
        // setIsUserAuthenticated(true);
        dispatch({type: "LOGIN", payload: user})
        dispatchNotification({type: "SHOW_SUCCESS", payload: `Welcome ${userName}`});
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setError("Email or Password didn't match");
        dispatchNotification({type: "SHOW_ERROR", payload: `SignIn Failed`});
      });
  };

  const googleAuth = () => {
    signInWithPopup(auth, provider)
    .then((user) => {
      console.log(user);
      const userName = user?.user?.displayName;
      dispatch({type: "LOGIN", payload: user})
      dispatchNotification({type: "SHOW_SUCCESS", payload: `Welcome ${userName}`});
      navigate("/");
    })
    .catch((error) => {
      console.log(error);
      dispatchNotification({type: "SHOW_ERROR", payload: `Google SignIn Failed`});
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Log in Form</h1>
      {error && <div className={styles.error}>Wrong Email Or Password</div>}

      <div className={styles.form_container}>
        <div className={styles.left}>
          <img className={styles.img} src="./images/login.png" alt="login" />
        </div>

        <div className={styles.right}>
          <h2 className={styles.from_heading}>Login Here</h2>
          <input
            type="email"
            className={styles.input}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className={styles.input}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.btn} onClick={() => loginWithEmail()}>Log In</button>
          <p className={styles.text}>or</p>

          <button className={styles.google_btn} onClick={googleAuth}>
            <img src="./images/google.svg" alt="google icon" />
            <span>SignIn with Google</span>
          </button>

          <p className={styles.text}>
            New Here ? <Link to="/signup">Sing Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
