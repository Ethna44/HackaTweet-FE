import styles from '../styles/Home.module.css';
import { Button, Modal } from 'antd';
import { login, logout } from '../reducers/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

function Login() {
  const [signUpUsername, setSignUpUsername] = useState('');
	const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpFirstName, setSignUpFirstName] = useState('');
  
  const [signInUsername, setSignInUsername] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const user = useSelector((state) => state.user.value);
  
  const handleRegister = () => {
		fetch('http://localhost:3000/users/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: signUpUsername, password: signUpPassword, firstname: signUpFirstName }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					dispatch(login({ username: signUpUsername, token: data.token }));
					setSignUpUsername('');
					setSignUpPassword('');
					setSignUpFirstName('');
					setIsModalVisible(false)
				}
			});
	};

	const handleConnection = () => {
		fetch('http://localhost:3000/users/signin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: signInUsername, password: signInPassword }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					dispatch(login({ username: signInUsername, token: data.token }));
					setSignInUsername('');
					setSignInPassword('');
					setIsModalVisible(false)
				}
			});
	};

	const handleCloseModal = () => {
		dispatch(logout());
	};

	const showModal = () => {
		setIsModalVisible(!isModalVisible);
	};

	let modalContent;
	if (!user.isConnected) {
		modalContent = (
			<div className={styles.registerContainer}>
				<div className={styles.registerSection}>
					<p>Sign-up</p>
					<input type="text" placeholder="Username" id="signUpUsername" onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername} />
					<input type="password" placeholder="Password" id="signUpPassword" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} />
					<button id="register" onClick={() => handleRegister()}>Register</button>
				</div>
				<div className={styles.registerSection}>
					<p>Sign-in</p>
					<input type="text" placeholder="Username" id="signInUsername" onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername} />
					<input type="password" placeholder="Password" id="signInPassword" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword} />
					<button id="connection" onClick={() => handleConnection()}>Connect</button>
				</div>
			</div>
		);
	}

  let userSection = null;
	if (user.token) {
		userSection = (
			<div className={styles.logoutSection}>
				<p>Welcome {user.username} / </p>
				<button onClick={() => handleLogout()}>Logout</button>
			</div>
		);
	} else {
		if (isModalVisible) {
			userSection =
				<div className={styles.headerIcons}>
					<FontAwesomeIcon onClick={showModal} className={styles.userSection} icon={faXmark} />
				</div>
		} else {
			userSection =
				<div className={styles.headerIcons}>
					<FontAwesomeIcon onClick={showModal} className={styles.userSection} icon={faXmark} />
				</div>
		}
	}

  return (  
	<div>
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
    <div>
		{isModalVisible && <div id="react-modals">
			<Modal getContainer="#react-modals" className={styles.modal} visible={isModalVisible} closable={false} footer={null}>
				{modalContent}
			</Modal>
		</div>}
	</div>
	</div> 
  );
}

export default Login;
