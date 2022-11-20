import React, { useEffect, useRef, useState, useContext } from 'react';
import filedContext from '../../context/FieldContext';
import styles from './DuplicationPlayer.module.css';
import userContext from '../../context/UserContext';

function DuplicationPlayer() {
  const fieldCtx = useContext(filedContext);
  const userCtx = useContext(userContext);
  const canvasRef3 = useRef(null);

  const canvasWidth = window.innerWidth;
  const canvasHeigth = window.innerHeight * 0.8;

  // let lastX = fieldCtx.lastX;
  // let lastY = fieldCtx.lastY;

  function duplicationHandler() {
    const canvas3 = canvasRef3.current;
    canvas3.width = canvasWidth;
    canvas3.height = canvasHeigth;
    const context3 = canvas3.getContext('2d');

    if (!fieldCtx.ctxEvenet || !fieldCtx.duplicationEvent) {
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
          {
            i < 6
              ? (context3.fillStyle = userCtx.ourColor)
              : (context3.fillStyle = userCtx.theirColor);
          }
          context3.globalAlpha = 0.5;
          context3.fill();
          context3.stroke();
          context3.font = '10px Arial';
          context3.fillStyle = '#323232';
          context3.globalAlpha = 0.9;
          context3.textAlign = 'center';
          context3.textBaseline = 'hanging';
          context3.fillText(
            userCtx.matchTeam[i] ? userCtx.matchTeam[i].userName : i,
            x,
            y - 7
          );
        } else if (i === fieldCtx.nowD) {
          // console.log('e', fieldCtx.ctxEvenet);
          if (
            fieldCtx.dupleLineCoords[i]?.length === 0 ||
            fieldCtx.ctxEvenet.type === 'touchstart'
          ) {
            continue;
          }
          fieldCtx.duplication[i] = [clientX, clientY];
          // 처음 플레이어 누르면 이전 복제 이벤트 끝난 좌표에 원 생성되는거 고쳐야 함!!!
          // 그리고 또 선 그리기에 가끔 이상하게 선이 이어지는 버그 있음.

          context3.beginPath();
          context3.arc(clientX, clientY, 15, 0, Math.PI * 2, true);
          {
            i < 6
              ? (context3.fillStyle = userCtx.ourColor)
              : (context3.fillStyle = userCtx.theirColor);
          }
          context3.globalAlpha = 0.5;
          context3.fill();
          context3.stroke();
          context3.font = '10px Arial';
          context3.fillStyle = '#323232';
          context3.globalAlpha = 0.9;
          context3.textAlign = 'center';
          context3.textBaseline = 'hanging';
          context3.fillText(
            userCtx.matchTeam[i] ? userCtx.matchTeam[i].userName : i,
            clientX,
            clientY - 7
          );
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
