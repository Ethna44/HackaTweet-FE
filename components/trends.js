import styles from "../styles/trends.module.css";
import { useSelector, useDispatch } from "react-redux";

function Trends() {
     return (
         


      <div className={styles.trendContainer} >

   <div>  <h2 className={styles.trendTitle}>Trends</h2>
   </div>

    <div className={styles.trendBox} >

   <div className={styles.trendContent}><p className={styles.hashtag}>#hackatweet</p>
   <p className={styles.countTweet}> 2 tweets</p>
   </div>

   <div className={styles.trendContent}><p className={styles.hashtag}>#fist   </p>
   <p className={styles.countTweet}> 2 tweets</p>
   </div>

   <div className={styles.trendContent}><p className={styles.hashtag}>#cenation </p>
        <p className={styles.countTweet}> 1000 Tweets</p>
        </div>
        
        </div>
      </div>
    );
  }

  return (
    <div className={styles.trendContainer}>
      <div className={styles.trendBox}>{trendsContent}</div>
    </div>
  );
}

export default Trends;
