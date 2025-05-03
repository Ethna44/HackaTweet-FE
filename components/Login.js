import styles from "../styles/login.module.css";
import { useState } from "react";
import { Modal } from "antd";
import { login } from "../reducers/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import "antd/dist/antd.css";

function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
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
          router.push("/home");
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
          router.push("/home");
        }
      });
  };

  const showModalSignUp = () => {
    setIsModalSignUpVisible(!isModalSignUpVisible);
  };

  const showModalSignIn = () => {
    setIsModalSignInVisible(!isModalSignInVisible);
  };

  const modalSignUpContent = (
    <div className={styles.registerContainer}>
      <div className={styles.registerSection}>
        <FontAwesomeIcon icon={faTwitter} className={styles.twitter}/>
        <p className={styles.text}>Create your Hackatweet account</p>
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
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          id="signUpPassword"
          onChange={(e) => setSignUpPassword(e.target.value)}
          value={signUpPassword}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Firstname"
          id="signUpFirstname"
          onChange={(e) => setSignUpFirstName(e.target.value)}
          value={signUpFirstName}
          className={styles.input}
        />
        <button className={styles.link} onClick={handleRegister}>
          <p className={styles.sign}>Sign Up</p>
        </button>
      </div>
    </div>
  );

  const modalSignInContent = (
    <div className={styles.registerContainer}>
      <div className={styles.registerSection}>
        <FontAwesomeIcon icon={faTwitter} className={styles.twitter}/>
        <p className={styles.text}>Connect to Hackatweet</p>
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
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          id="signInPassword"
          onChange={(e) => setSignInPassword(e.target.value)}
          value={signInPassword}
          className={styles.input}
        />
        <button className={styles.link} onClick={handleConnection}>
          <p className={styles.sign}>Sign In</p>
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.images}></div>
        <div className={styles.connexion}>
          <FontAwesomeIcon icon={faTwitter} className={styles.logo}/>
          <h1 className={styles.titre}>See what's happening</h1>
          <p className={styles.join}>Join HackaTweet Today.</p>
          <button onClick={showModalSignUp} className={styles.signup}>
            Sign Up
          </button>
          <p className={styles.account}>Already have an account?</p>
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
