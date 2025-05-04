import styles from '../styles/tweet.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart,faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTrend } from '../reducers/hashtag';
import { useEffect } from 'react';


function Tweet(props) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.value)
  const [likes, setLikes] = useState(props.likes.length);
  const [isLiked, setIsLiked] = useState(props.likes.includes(user.token));

    const handleLikeTweet = () => {
      fetch(`http://localhost:3000/tweet/like/${props._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id }),
      })
        .then(res => res.json())
        .then(data => {
          setLikes(data.tweet.likes.length);
          setIsLiked(data.tweet.likes.includes(user.token));
        });
    };
  
    const handleDeleteTweet = () => {
      fetch(`http://localhost:3000/tweet/${props._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${user.token}`, //envoi du token
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.result) {
            // suppression autorisée => on met à jour le state
            props.onDelete(props._id);
          }
        });
    };
    
    let heartIconStyle = { 'cursor': 'pointer' };
    if (isLiked) {
      heartIconStyle = { 'color': '#e74c3c', 'cursor': 'pointer' };
    } else {
      heartIconStyle = { 'color': 'white', 'cursor': 'pointer' }
    }

    useEffect(() => {
      const message = props.content;
      const regex = /#([\p{L}_][\p{L}\p{N}_]*)/gu;
      const regTweet = message.match(regex);
      if(regTweet){
        dispatch(addTrend(regTweet));
      }
    }, [props.content]);

  return (
    <div className={styles.tweetContainer}>
      <div className={styles.head}>
        <img src='twitter.webp' className={styles.logo} alt="User avatar" />
        <p className={styles.firstName}>{props.user.firstname}</p>
        <p className={styles.username}>@{props.user.username}</p>
        <p className={styles.username}>· {new Date(props.createdAt).toLocaleTimeString()}</p>
      </div>
      <div className={styles.text}>
      <p>{props.content}</p>
      </div>
      <div className={styles.icons}>
        <span><FontAwesomeIcon onClick={() => handleLikeTweet()} icon={faHeart} className={styles.heart} style={heartIconStyle} /></span><span> {likes} </span>
        <span><FontAwesomeIcon onClick={() => handleDeleteTweet()} icon={faTrash} className={styles.trash} /></span>
      </div>
    </div>
  );
}


export default Tweet;
