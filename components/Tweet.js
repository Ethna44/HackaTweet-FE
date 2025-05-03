import styles from '../styles/tweet.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart,faTrash} from "@fortawesome/free-solid-svg-icons";
import {useState} from 'react'
import { useDispatch ,useSelector } from 'react-redux';


function Tweet(props) {

    const handleLikeTweet = () => {
      props.updateLikedTweets(props.content)
    }
    let heartIconStyle = { 'cursor': 'pointer' };
    if (props.isLiked) {
      heartIconStyle = { 'color': '#e74c3c', 'cursor': 'pointer' };
    }
  
  return (
    <div className={styles.tweetContainer}>
      <div className={styles.head}>
        <img src='twitter.webp' className={styles.logo} alt="User avatar" />
        <p className={styles.firstName}>{props.user.firstname}</p>
        <p className={styles.username}>@{props.user.username}</p>
        <p className={styles.username}> · heure</p>
      </div>
      <div className={styles.text}>
        <p>{props.content}</p>
      </div>
      <div className={styles.icons}>
        <span><FontAwesomeIcon onClick={() => handleLikeTweet()} icon={faHeart} className={styles.heart} style={heartIconStyle} /></span><span> {like} </span>
        <span><FontAwesomeIcon icon={faTrash} className={styles.heart} /></span>
      </div>
    </div>
  );
}

export default Tweet;
