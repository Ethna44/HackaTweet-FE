import styles from "../styles/trends.module.css";
import { useSelector, useDispatch } from "react-redux";

function Trends() {
  const trends = useSelector((state) => state.hashtag.value);
  const trendsContent = [];

  for (let tag in trends) {
    const count = trends[tag];
    trendsContent.push(
      <div key={tag} className={styles.trendContent}>
        <p className={styles.hashtag}> {tag}</p>
        <p className={styles.countTweet}>{count}</p>
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
