import styles from "../styles/tweet.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTrends } from "../reducers/hashtag";
import { useEffect } from "react";

function Tweet(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const handleLikeTweet = () => {
    if (!user.token) return;
    fetch(`http://localhost:3000/tweet/like/${props._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          props.fetchTweets();
        }
      });
  };

  const handleDeleteTweet = () => {
    fetch(`http://localhost:3000/tweet/${props._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`, //envoi du token
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          // suppression autorisée => on met à jour le state
          props.onDelete(props._id);
        }
      });
  };

  let heartIconStyle = { cursor: "pointer" };

  if (props.isLiked) {
    heartIconStyle = { color: "#e74c3c", cursor: "pointer" };
  } else {
    heartIconStyle = { color: "white", cursor: "pointer" };
  }

  return (
    <div className={styles.tweetContainer}>
      <div className={styles.head}>
        <img src="twitter.webp" className={styles.logo} alt="User avatar" />
        <p className={styles.firstName}>{props.user.firstname}</p>
        <p className={styles.username}>@{props.user.username}</p>
        <p className={styles.username}>
          · {new Date(props.createdAt).toLocaleTimeString()}
        </p>
      </div>
      <div className={styles.text}>
        <p>{props.content}</p>
      </div>
      <div className={styles.icons}>
        <span>
          <FontAwesomeIcon
            onClick={() => handleLikeTweet()}
            icon={faHeart}
            className={styles.heart}
            style={heartIconStyle}
          />
        </span>
        <span> {props.likeCount} </span>
        <span>
          <FontAwesomeIcon
            onClick={() => handleDeleteTweet()}
            icon={faTrash}
            className={styles.trash}
          />
        </span>
      </div>
    </div>
  );
}

export default Tweet;
