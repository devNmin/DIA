import styles from './ScoreBoard.module.css';
import { useEffect, useState, useContext } from 'react';
import filedContext from '../../../context/FieldContext';
import userContext from '../../../context/UserContext';
import { width } from '@mui/system';

function ScoreBoard() {
  const fieldCtx = useContext(filedContext);
  const userCtx = useContext(userContext);
  const [touchStart, setTouchStart] = useState(null);

  const LongTouchHandler = ({ e, team }) => {
    if (e.timeStamp - touchStart.timeStamp > 500) {
      if (team === '1') {
        fieldCtx.setScore1(0);
      } else {
        fieldCtx.setScore2(0);
      }
    } else {
      if (team === '1') {
        fieldCtx.setScore1((prev) => prev + 1);
      } else {
        fieldCtx.setScore2((prev) => prev + 1);
      }
    }
  };
  useEffect(() => {}, [fieldCtx.score1, fieldCtx.score2]);
  return (
    <div className={styles.score_box}>
      <div className={styles.score_inner}>
        <div
          className={styles.team_color}
          style={{ backgroundColor: userCtx.ourColor }}
        ></div>
        <div
          className={styles.inner_box}
          onTouchStart={(e) => setTouchStart(e)}
          onTouchEnd={(e) => LongTouchHandler({ e: e, team: '1' })}
        >
          <h3 className={styles.score}>{fieldCtx.score1}</h3>
        </div>
        <h3 className={styles.jum}>:</h3>
        <div
          className={styles.inner_box}
          onTouchStart={(e) => setTouchStart(e)}
          onTouchEnd={(e) => LongTouchHandler({ e: e, team: '2' })}
        >
          <h3 className={styles.score}>{fieldCtx.score2}</h3>
        </div>
        <div
          className={styles.team_color}
          style={{ backgroundColor: userCtx.theirColor }}
        ></div>
      </div>
    </div>
  );
}
export default ScoreBoard;
