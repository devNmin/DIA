import styles from './HeartIcon.module.css';
import FavoriteIcon from '@mui/icons-material/Favorite';

function HeartIcon({ user, heartB }) {
  if (user && heartB !== 0) {
    return <FavoriteIcon className={styles.heart_icon} />;
  } else {
    return <FavoriteIcon className={styles.dark_heart} />;
  }
}
export default HeartIcon;
