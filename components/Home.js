import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
//import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../reducers/user";
import Image from "next/image";
import Tweet from "./Tweet";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [charCount, setCharCount] = useState(0);
  const charLimit = 280;

  const handleLogout = () => {
    dispatch(logout());
  };
  const [tweetData, setTweetData] = useState([])
  useEffect(() => {
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then(data => {
        setTweetData(data.tweet)
      });
  }, []);

  const tweet = tweetData.map((data, i) => {
    return <Tweet key={i} {...data}/>
  })

  // const [likedTweets, setLikedTweets]
  // const updateLikedTweets = (content) => {
  //   if (likedTweets.find(tweet => tweet ===))
  // }

  const props = {
    firstname: "Tiago",
    username: "@Tiago3000",
  };
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.logomain}>
            <FontAwesomeIcon icon={faTwitter} className={styles.twitter}/>
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
            placeholder="What's up?"
          />
          <div className={styles.tweetsection}>
            <span>
              {charCount}/{charLimit}
            </span>
            <button className={styles.tweetbutton}>TWEET</button>
          </div>
        </div>
        <div className={styles.tweet}>
          {tweet}    
        </div>
        <div className={styles.trend}>
          <h1 className={styles.title}>Trends</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
