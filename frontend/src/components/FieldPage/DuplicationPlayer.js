import React, { useEffect, useRef, useState, useContext } from 'react';
import styles from './DuplicationPlayer.module.css';
import filedContext from '../../context/FieldContext';

function DuplicationPlayer() {
  const fieldCtx = useContext(filedContext);
  const canvasRef3 = useRef(null);
  const [ctx3, setCtx3] = useState();

  const canvasWidth = window.innerWidth;
  const canvasHeigth = window.innerHeight * 0.8;

  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
  function duplicationHandler() {
    if (!fieldCtx.duplicationEvent) {
      return;
    }
    const canvas3 = canvasRef3.current;
    canvas3.width = canvasWidth;
    canvas3.height = canvasHeigth;
    const context3 = canvas3.getContext('2d');
    setCtx3(context3);

    const { clientX, clientY } = fieldCtx.duplicationEvent.changedTouches[0];
    if (!fieldCtx.isMoving) {
      context3.moveTo(clientX, clientY);
    } else if (fieldCtx.nowD > -1) {
      context3.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = 0; i < 6; i++) {
        // 이전에 만든 복제 원
        if (i in fieldCtx.duplication && i !== fieldCtx.nowD) {
          const x = fieldCtx.duplication[i][0];
          const y = fieldCtx.duplication[i][1];
          context3.beginPath();
          context3.moveTo(clientX, clientY);
          context3.beginPath();

          context3.arc(x, y, 15, 0, Math.PI * 2, true);
          context3.font = '25px Arial';
          context3.fillText(i, x - 7.5, y - 6);
          context3.fillStyle = colors[i];
          context3.globalAlpha = 0.5;
          context3.fill();
          context3.stroke();
        } else if (i === fieldCtx.nowD) {
          ///지금 움직이는 원
          context3.beginPath();
          fieldCtx.duplication[i] = [clientX, clientY];
          const x = fieldCtx.duplication[i][0];
          const y = fieldCtx.duplication[i][1];

          context3.moveTo(clientX, clientY);
          context3.beginPath();

          context3.arc(x, y, 15, 0, Math.PI * 2, true);
          context3.font = '25px Arial';
          context3.fillText(i, x - 7.5, y - 7.5);
          context3.fillStyle = colors[i];
          context3.globalAlpha = 0.8;
          context3.fill();
          context3.stroke();
        }
      }
    }
  }
  useEffect(() => {
    // setInterval(IntervalContinue, 100);
    duplicationHandler();
  }, [fieldCtx.isPause, fieldCtx.duplication]);

  return <canvas className={styles.canvas3} ref={canvasRef3} />;
}
export default DuplicationPlayer;
