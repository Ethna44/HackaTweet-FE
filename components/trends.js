import styles from "../styles/trends.module.css";
import { useSelector, useDispatch } from "react-redux";

import hashtag from "../components/hashtag";
import Link from "next/link";

function Trends() {
  const trends = useSelector((state) => state.hashtag.value);
  const trendsContent = [];

  for (let tag of trends) {
    const count = trends[tag];
    trendsContent.push(
      <div key={tag} className={styles.trendContent}>
        <Link href="/hashtag" className={styles.hashtag}>
          {tag}
        </Link>
        <p className={styles.countTweet}>{count} Tweet</p>
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
