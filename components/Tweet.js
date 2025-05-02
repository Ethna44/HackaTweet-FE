import styles from '../styles/tweet.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart,faTrash} from "@fortawesome/free-solid-svg-icons";
import {useState} from 'react'
import { useDispatch ,useSelector } from 'react-redux';


function Tweet() {
    const[like,setLike]=useState(0)

    const props ={
        firstname: "Ethan",
        UserName:"Reazay",
        Text: 'vive pokemon',    
    }

    

  return (
    <div className={styles.tweetContainer}>
      <div className={styles.head}>
        <img src='twitter.webp' className={styles.logo} alt="User avatar" />
        <p className={styles.firstName}>{props.firstname}</p>
        <p className={styles.username}>@{props.UserName}</p>
        <p className={styles.username}> · heure</p>
      </div>
      <div className={styles.text}>
        <p>{props.Text}</p>
      </div>
      <div className={styles.icons}>
        <span><FontAwesomeIcon icon={faHeart} className={styles.heart} /></span><span> {like} </span>
        <span><FontAwesomeIcon icon={faTrash} className={styles.heart} /></span>
      </div>
    </div>
  );
}

export default Tweet;
