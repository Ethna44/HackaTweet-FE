import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { login, logout } from "../reducers/user";
import Image from "next/image";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [charCount, setCharCount] = useState(0);
  const charLimit = 280;

  const handleLogout = () => {
    dispatch(logout());
  };

  const props = {
    firstname: "HarryPotdeBeurre",
    username: "@FuttBuker3000",
  };
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.logomain}>
            <Image
              src="/logotwitter.png"
              alt="Logo"
              height={100}
              width={100}
              className={styles.logo}
            ></Image>
          </div>
          <div>
            <div className={styles.logoutSection}>
              <Image src="/oeuf.jpeg" alt="Logo" height={50} width={50} />

              <h3 className={styles.title}>{props.firstname}</h3>
              <p>{props.username}</p>
              <button className={styles.button} onClick={() => handleLogout()}>
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className={styles.home}>
          <h5 className={styles.title}>Home</h5>
          <textarea
            maxLength={charLimit}
            onChange={(e) => setCharCount(e.target.value.length)}
            type="text"
              rows="3"
              cols="90"
            placeholder="Créer   votre prochain drama/cyberharcelement."
          />
          <div className={styles.tweetsection}>
            <span>
              {charCount}/{charLimit}
            </span>
            <button className={styles.tweetbutton}> TWEET</button>
          </div>
        </div>
        <div className={styles.tweet}>
              
        </div>
        <div className={styles.trend}>
          <h1 className={styles.title}> Trends</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
