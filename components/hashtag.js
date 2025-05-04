import styles from "../styles/Hashtag.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { login, logout } from "../reducers/user";
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import Image from "next/image";
import Link from 'next/link';

function Hashtag() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value)
  const [charCount, setCharCount] = useState(0);
  const charLimit = 280;
  const [hashtag,setHashtag]= useState("")

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
            <Link href="/home">
            <FontAwesomeIcon  icon={faTwitter} className={styles.logo}/>
            </Link>
          </div>
          <div>
            <div className={styles.logoutSection}>
              <Image src="/oeuf.jpeg" alt="Logo" height={50} width={50} />

              <h3 className={styles.firstname}>{props.firstname}</h3>
              <p>{props.username}</p>
              <button className={styles.button} onClick={() => handleLogout()}>
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className={styles.hashtag}>
          <h2 className={styles.title}>Hashtag</h2>
          <input onChange={(e) => setEmail(e.target.value)} value={hashtag}
          className={styles.input}/>
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

export default Hashtag;
