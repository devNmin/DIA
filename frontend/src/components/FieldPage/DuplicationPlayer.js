import React, { useEffect, useRef, useState, useContext } from 'react';
import filedContext from '../../context/FieldContext';
import styles from './DuplicationPlayer.module.css';

function DuplicationPlayer() {
  const fieldCtx = useContext(filedContext);
  const canvasRef3 = useRef(null);

  const canvasWidth = window.innerWidth;
  const canvasHeigth = window.innerHeight * 0.8;

  // let lastX = fieldCtx.lastX;
  // let lastY = fieldCtx.lastY;

  const colors = [
    'red',
    'red',
    'red',
    'red',
    'red',
    'red',
    'blue',
    'blue',
    'blue',
    'blue',
    'blue',
    'blue',
  ];
  function duplicationHandler() {
    const canvas3 = canvasRef3.current;
    canvas3.width = canvasWidth;
    canvas3.height = canvasHeigth;
    const context3 = canvas3.getContext('2d');

    if (!fieldCtx.duplicationEvent) {
      return;
    }
    if (!fieldCtx.isPause) {
      context3.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
    const { clientX, clientY } = fieldCtx.duplicationEvent.changedTouches[0];

    if (fieldCtx.nowD > -1) {
      context3.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = 0; i < 12; i++) {
        // 이전에 만든 복제 원
        if (i in fieldCtx.duplication && i !== fieldCtx.nowD) {
          const x = fieldCtx.duplication[i][0];
          const y = fieldCtx.duplication[i][1];

          context3.beginPath();
          context3.arc(x, y, 15, 0, Math.PI * 2, true);
          context3.font = '25px Arial';
          context3.fillText(i, x - 7.5, y - 6);
          context3.fillStyle = colors[i];
          context3.globalAlpha = 0.5;
          context3.fill();
          context3.stroke();
        } else if (i === fieldCtx.nowD) {
          fieldCtx.duplication[i] = [clientX, clientY];
          context3.beginPath();
          context3.arc(clientX, clientY, 15, 0, Math.PI * 2, true);
          context3.font = '25px Arial';
          context3.fillText(i, clientX - 7.5, clientY - 7.5);
          context3.fillStyle = colors[i];
          context3.globalAlpha = 0.5;
          context3.fill();
          context3.stroke();
        }
      }
    }
  }

  useEffect(() => {
    duplicationHandler();
  }, [fieldCtx.isPause, fieldCtx.isMoving]);

  return <canvas className={styles.canvas3} ref={canvasRef3} />;
}
export default DuplicationPlayer;
