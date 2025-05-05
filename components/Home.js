import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { logout } from "../reducers/user";
import { addTrend } from '../reducers/hashtag';
import { useRouter } from 'next/router';
import Image from "next/image";
import Tweet from "./Tweet";
import Trends from "./trends";

function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value); // renvoie token, first name et username
  const hashtag = useSelector((state) => state.hashtag.value);
  const [charCount, setCharCount] = useState(0);
  const [tweetContent, setTweetContent] = useState("");
  const [tweetData, setTweetData] = useState([]);
  const charLimit = 280;

  const fetchTweets = () => {
    fetch("http://localhost:3000/tweet/" + user?.token)
      .then((response) => response.json())
      .then((data) => {
        setTweetData(data.tweet);
     
        for(let i = 0 ; i < data.tweet.length ;i++){
          const message = data.tweet[i].content;
          const regex = /#([\p{L}_][\p{L}\p{N}_]*)/gu;
          const regTweet = message.match(regex);
          if(regTweet){
            dispatch(addTrend(regTweet));
          }   
        }
      });
  };

  // Récupération des tweets au chargement
  useEffect(() => {
    fetchTweets();
  }, [user.token]);


  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  const handleTweetSubmit = () => {
    if (!tweetContent.trim()) return; //évite d'envoyer un tweet vide

    fetch("http://localhost:3000/tweet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: tweetContent,
        token: user.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setTweetData([...tweetData,data.tweet]);
          setTweetContent("");
          setCharCount(0);
          const message = data.content;
          const regex = /#([\p{L}_][\p{L}\p{N}_]*)/gu;
          const regTweet = message.match(regex);
          dispatch(addTrend(regTweet));
        }
      });
  };

  const handleDeleteTweet = (idToDelete) => {
    setTweetData(tweetData.filter((tweet) => tweet._id !== idToDelete));
  };

  const tweets = tweetData.map((data, i) => (
    <Tweet
      key={i}
      {...data}
      likeCount={data.likes.length}
      onDelete={handleDeleteTweet}
      isLiked={data.hasLiked}
      fetchTweets={fetchTweets}
    />
  ));


  return (
    <div>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.logomain}>
            <FontAwesomeIcon
              icon={faTwitter}
              className={styles.twitter}
            />
          </div>
          <div>
            <div className={styles.logoutContainer}>
              <div className={styles.topLog}>
                <Image
                  className={styles.logo}
                  src="/twitter.webp"
                  alt="Logo"
                  width={50}
                  height={50}
                />
                <div className={styles.user}>
                  <p className={styles.firstname}>{user.firstname}</p>
                  <p className={styles.username}>@{user.username}</p>
                </div>
              </div>
              <button className={styles.button} onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className={styles.home}>
          <h5 className={styles.title}>Home</h5>
          <div className={styles.tweetInputContainer}>
            <textarea
              maxLength={charLimit}
              value={tweetContent}
              onChange={(e) => {
                setCharCount(e.target.value.length);
                setTweetContent(e.target.value);
              }}
              rows="3"
              cols="90"
              placeholder="What's up?"
              className={styles.textarea}
            />
            <div className={styles.tweetsection}>
              <span>
                {charCount}/{charLimit}
              </span>
              <button
                onClick={handleTweetSubmit}
                className={styles.tweetbutton}
              >
                TWEET
              </button>
            </div>
          </div>
        </div>

        <div className={styles.tweetList}>{tweets}</div>

        <div className={styles.trend}>
          <h1 className={styles.title}>Trends</h1>
          <Trends />
        </div>
      </div>
    </div>
  );
}

export default Home;
