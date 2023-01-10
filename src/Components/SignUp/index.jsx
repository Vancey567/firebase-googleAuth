import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";

import styles from "./styles.module.css";
import { AuthContext } from "../../context/AuthContext";

function Signup() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");

  const navigate = useNavigate();
  const {dispatch} = useContext(AuthContext);

  const signupWithEmail = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed Up Successfully
        const user = userCredential.user;
        setData(user);
        navigate("/login");
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };

  const googleAuth = () => {
    signInWithPopup(auth, provider)
    .then((user) => {
      console.log(user);
      setData(user);
      dispatch({type: "LOGIN", payload: user})
      navigate("/");
    })
    .catch((error) => {
      console.log(error);
      setError(true);
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Sign up Form</h1>
      {error && <div className={styles.error}>Wrong Email Or Password</div>}

      <div className={styles.form_container}>
        <div className={styles.left}>
          <img className={styles.img} src="./images/login.png" alt="signup" />
        </div>

        <div className={styles.right}>
          <h2 className={styles.from_heading}>Create Account</h2>
          {/* <input type="text" className={styles.input} placeholder="Username" /> */}
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
          <button className={styles.btn} onClick={() => signupWithEmail()}>
            Sign Up
          </button>
          <p className={styles.text}>or</p>
          
          <button className={styles.google_btn} onClick={googleAuth}>
            <img src="./images/google.svg" alt="google icon" />
            <span>SingUp with Google</span>
          </button>
          <p className={styles.text}>
            Already Have Account ? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
