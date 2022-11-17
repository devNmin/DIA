import styles from './HeartIcon.module.css';
import FavoriteIcon from '@mui/icons-material/Favorite';

function HeartIcon({ user }) {
  if (user) {
    return <FavoriteIcon className={styles.heart_icon} />;
  } else {
    return <FavoriteIcon className={styles.dark_heart} />;
  }
}
export default HeartIcon;
