import React from 'react';
import FirstVideo from '../../assets/FirstPage.mp4'
import styles from './FirstPageVideo.module.css'

function FirstPageVideo(props) {
  return (
    <div className={styles.container}>
      <video autoPlay loop muted className={styles.video}>
        <source src={FirstVideo} type='video/mp4' />
      </video>
      <div className={styles.text}>
        <p>DIA를 시작하려면 화면을 클릭해주세요</p>
      </div>
    </div>
  );
}

export default FirstPageVideo;