import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Record.module.css'

function Record({ id, coverImg, title }) {
  return (
    <div>
      <img src={coverImg} alt={title} className={styles.record__img} />
      <div>
        <h2 className={styles.record__title}>
          <Link to={`/movie/${id}`}>{title}</Link>
        </h2>
      </div>
    </div>
  );
}

export default Record;