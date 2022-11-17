import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Record.module.css';

function Record({ gameId, gameYear, gameMonth, gameDay, gameTime }) {
  return (
    <div>
      <img
        src="https://www.phinational.org/wp-content/uploads/2017/07/fb-test-image-470x246.jpg"
        alt={'test'}
        className={styles.record__img}
      />
      <Link to={`/detail/${gameId}`}>
        <div>
          <h2 className={styles.record__title}>
            <p>{gameId}</p>
            <p>{gameYear}</p>
            <p>{gameMonth}</p>
            <p>{gameDay}</p>
            <p>{gameTime}</p>
          </h2>
        </div>
      </Link>
    </div>
  );
}

export default Record;
