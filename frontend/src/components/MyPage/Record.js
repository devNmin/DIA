import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Record.module.css';

function Record({ gameId, gameYear, gameMonth, gameDay, gameTime, gameScore }) {
  return (
    <div>
      <div className={styles.card_flip}>
        <div className={`${styles.frontCard} ${styles.invCard}`}>
          <div className={styles.card_container}>
            <h4>{gameYear}년 {gameMonth}월 {gameDay}일 {gameTime}시</h4>
            <h4>{gameScore}</h4>
          </div>
        </div>
        <div className={`${styles.backCard} ${styles.invCard2}`}>
          <div className={styles.card_container2}>
            <Link to={`/detail/${gameId}`}>
              <h4>상세 정보 확인</h4>              
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Record;
