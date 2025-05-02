import styles from "../styles/login.module.css";
import { useState } from "react";
import { Modal } from "antd";
import { login } from "../reducers/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import "antd/dist/antd.css";

function Login() {
  const dispatch = useDispatch();
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpFirstName, setSignUpFirstName] = useState("");

  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [isModalSignUpVisible, setIsModalSignUpVisible] = useState(false);
  const [isModalSignInVisible, setIsModalSignInVisible] = useState(false);
  const [userOk, setUserOk] = useState(false);

  const user = useSelector((state) => state.user.value);

  const handleRegister = () => {
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		firstname: signUpFirstName,
        username: signUpUsername,
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ username: signUpUsername, token: data.token }));
          setSignUpUsername("");
          setSignUpPassword("");
          setSignUpFirstName("");
          setIsModalSignUpVisible(false);
          setUserOk(true);
        }
      });
  };

  const handleConnection = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ username: signInUsername, token: data.token }));
          setSignInUsername("");
          setSignInPassword("");
          setIsModalSignInVisible(false);
          setUserOk(true);
        }
      });
  };

  const showModalSignUp = () => {
    console.log("here");
    setIsModalSignUpVisible(!isModalSignUpVisible);
  };

  const showModalSignIn = () => {
    setIsModalSignInVisible(!isModalSignInVisible);
  };

  let modalSignUpContent = (
    <div className={styles.registerContainer}>
      <div className={styles.registerSection}>
        <p>Create your Hackatweet account</p>
        <FontAwesomeIcon
          onClick={showModalSignUp}
          className={styles.userSection}
          icon={faXmark}
        />
        <input
          type="text"
          placeholder="Username"
          id="signUpUsername"
          onChange={(e) => setSignUpUsername(e.target.value)}
          value={signUpUsername}
        />
        <input
          type="password"
          placeholder="Password"
          id="signUpPassword"
          onChange={(e) => setSignUpPassword(e.target.value)}
          value={signUpPassword}
        />
        <input
          type="text"
          placeholder="Firstname"
          id="signUpFirstname"
          onChange={(e) => setSignUpFirstName(e.target.value)}
          value={signUpFirstName}
        />
        <Link href="/home" id="register" onClick={() => handleRegister()}>
          Sign Up
        </Link>
      </div>
    </div>
  );

  let modalSignInContent = (
    <div className={styles.registerContainer}>
      <div className={styles.registerSection}>
        <p>Connect to Hackatweet</p>
        <FontAwesomeIcon
          onClick={showModalSignIn}
          className={styles.userSection}
          icon={faXmark}
        />
        <input
          type="text"
          placeholder="Username"
          id="signInUsername"
          onChange={(e) => setSignInUsername(e.target.value)}
          value={signInUsername}
        />
        <input
          type="password"
          placeholder="Password"
          id="signInPassword"
          onChange={(e) => setSignInPassword(e.target.value)}
          value={signInPassword}
        />
		<Link href="/home" id="connection" onClick={() => handleConnection()}>
		Sign In
        </Link>
      </div>
    </div>
  );

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.images}></div>
        <div className={styles.connexion}>
          <img className={styles.logo} src="icons8-twitter-100.png" />
          <h1 className={styles.titre}>See what's happening</h1>
          <p>Join the HackaTweet Now</p>
          <button onClick={showModalSignUp} className={styles.signup}>
            Sign Up
          </button>
          <p>Already have an account</p>
          <button onClick={showModalSignIn} className={styles.signin}>
            Sign In
          </button>
        </div>
      </div>
      <Modal
        className={styles.modal}
        open={isModalSignUpVisible}
        closable={false}
        footer={null}
      >
        {modalSignUpContent}
      </Modal>
      <Modal
        className={styles.modal}
        open={isModalSignInVisible}
        closable={false}
        footer={null}
      >
        {modalSignInContent}
      </Modal>
    </div>
  );
}

export default Login;
