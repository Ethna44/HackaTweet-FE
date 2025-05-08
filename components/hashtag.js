import styles from "../styles/hashtag.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { login, logout } from "../reducers/user";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import Link from "next/link";
import Trends from "./trends";
import Tweet from "./Tweet";
import { useRouter } from "next/router";


function Hashtag() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const hash = useSelector((state) => state.hashtag.value);
  const [charCount, setCharCount] = useState(0);
  const charLimit = 280;
  const [hashtag, setHashtag] = useState("");
  const router = useRouter();
  const [tweetData,setTweetData]= useState([])

  const handleLogout = () => {
    dispatch(logout());
    router.push("/"); //A utilser plutot que windows Location pour éviter de render de nouveau la page, un peu comme <Link>
  };

  useEffect(() => {
      fetch("http://localhost:3000/tweet")
        .then((response) => response.json())
        .then((data) => {
          setTweetData(data.tweet);
        });
    }, []);

    const Filtered = tweetData.filter((data) => hash.includes(data))

    if(Filtered.includes(hashtag)){
        Filtered.map((data,i)=>(
          <Tweet key={i} {...data}/>
        ))
    }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.logomain}>
            <Link href="/home">
              <FontAwesomeIcon icon={faTwitter} className={styles.logo} />
            </Link>
          </div>
          <div>
            <div className={styles.logoutSection}>
             <div className={styles.topLog}>
              <Image  className={styles.logo} src="/twitter.webp" alt="Logo" height={50} width={50} />
             <div className={styles.user}>
                              <p className={styles.firstname}>{user.firstname}</p>
                              <p className={styles.username}>@{user.username}</p>
                            </div>
                      </div>
              <button className={styles.button} onClick={() => handleLogout()}>
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className={styles.hashtag}>
          <h2 className={styles.title}>Hashtag</h2>
          <input
            onChange={(e) => setHashtag(e.target.value)}
            value={hashtag}
            className={styles.input}
          />
        </div>
        <div className={styles.tweet}>
          {Filtered}
        </div>
        <div className={styles.trend}>
          <h1 className={styles.title}> Trends</h1>
          <Trends />
        </div>
      </div>
    </div>
  );
}

export default Hashtag;
