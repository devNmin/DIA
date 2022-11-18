import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Record.module.css';

function Record({ gameId, gameYear, gameMonth, gameDay, gameTime }) {
  return (
    <div>
      <div className={styles.card_flip}>
        <div className={`${styles.frontCard} ${styles.invCard}`}>
          <div className={styles.card_container}>
            <h2>{gameYear} {gameMonth} {gameDay} {gameTime}</h2>
          </div>
        </div>
        <div className={`${styles.backCard} ${styles.invCard2}`}>
          <div className={styles.card_container2}>
            <Link to={`/detail/${gameId}`}>
              <h2>상세 정보 확인</h2>              
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Record;
