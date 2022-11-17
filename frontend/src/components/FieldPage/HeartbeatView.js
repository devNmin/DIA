import React from 'react';
import styles from './HeartbeatView.module.css';
import HeartIcon from './FieldTools/HeartIcon';
function HeartbeatView({ user, heartB }) {
  return (
    <div className={styles.hb_box}>
      <div className={styles.user_num}>{user}</div>
      <div className={styles.hb}>
        <HeartIcon />
        <div>{heartB}</div>
      </div>
    </div>
  );
}

export default HeartbeatView;
