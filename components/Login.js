import styles from '../styles/Home.module.css';

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.images}>
      </div>
      <div className={styles.connexion}>
        <img className={styles.logo} src="icons8-twitter-100.png"/>
          <h1 className={styles.titre}>See what's happening</h1>
          <p>Join the HackaTweet Now</p>
          <button className={styles.signin}>Sign-In</button>
          <p>Already have an account</p>
          <button className={styles.signup}>Sign Up</button>
      </div>
    </div>
  );
}

export default Login;