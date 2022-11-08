import styles from './CoordsSet.module.css';
import React, { useEffect, useRef, useState, useContext } from 'react';
import filedContext from '../../context/FieldContext';

function CoordsSet({ CoordsTwo }) {
  ///

  ///

  const fieldCtx = useContext(filedContext);
  const canvasRef2 = useRef(null);

  const canvasWidth = window.innerWidth;
  const canvasHeigth = window.innerHeight * 0.8;

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
  /*
  const fieldSet = () => {
    const canvas2 = canvasRef2.current;
    canvas2.width = canvasWidth;
    canvas2.height = canvasHeigth;
    const context2 = canvas2.getContext('2d');

    if (fieldCtx.isPause || !fieldCtx.allCoords) {
      console.log('fieldCtx.isPause || !fieldCtx.coord');
      return;
    }
    console.log(fieldCtx.coord);
    if (context2 && fieldCtx.coord) {
      context2.clearRect(0, 0, window.innerWidth, window.innerHeight);
      // i = 선수 번호
      for (let i of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) {
        const x = fieldCtx.coord[i][0];
        const y = fieldCtx.coord[i][1];

        context2.moveTo(x, y);
        context2.beginPath();
        console.log();
        context2.arc(x, y, 15, 0, Math.PI * 2, true);
        context2.fillStyle = colors[i];
        context2.fill();
        context2.stroke();
        // fieldCtx.allCoords[i].push([x, y]);
      }
    }
  };
  */
  const fieldSet = () => {
    // console.log('fieldCtx.allCoords', fieldCtx.allCoords);
    const canvas2 = canvasRef2.current;
    canvas2.width = canvasWidth;
    canvas2.height = canvasHeigth;
    const context2 = canvas2.getContext('2d');

    // console.log(
    //   '왜 이럴까 ',
    //   fieldCtx.playIndex.length +
    //     '\n' +
    //     fieldCtx.allCoords[0][fieldCtx.playIndex] +
    //     '\n' +
    //     fieldCtx.allCoords[0][fieldCtx.playIndex][0]
    // );

    // console.log('있다0', fieldCtx.playIndex);
    // console.log('있다1', fieldCtx.allCoords[0][fieldCtx.playIndex]);
    // console.log('있다2', fieldCtx.allCoords[0][fieldCtx.playIndex][0]);
    console.log('allCoords', fieldCtx.allCoords);
    console.log('allCoords[0].length', fieldCtx.allCoords[0].length);
    console.log('playIndex', fieldCtx.playIndex);
    if (context2 && fieldCtx.allCoords[0]) {
      context2.clearRect(0, 0, window.innerWidth, window.innerHeight);
      // i = 선수 번호
      for (let i of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) {
        if (
          fieldCtx.allCoords[i].length < 1 ||
          fieldCtx.allCoords[i][fieldCtx.playIndex].length < 1
        ) {
          break;
        }

        const x = fieldCtx.allCoords[i][fieldCtx.playIndex][0];
        const y = fieldCtx.allCoords[i][fieldCtx.playIndex][1];
        console.log('i, x,y', i, x, y);

        context2.moveTo(x, y);
        context2.beginPath();
        console.log();
        context2.arc(x, y, 15, 0, Math.PI * 2, true);
        context2.fillStyle = colors[i];
        context2.fill();
        context2.stroke();
        // fieldCtx.allCoords[i].push([x, y]);
      }
    }
  };

  const IntervalContinue = () => {
    if (!fieldCtx.isPause && fieldCtx.allCoords[0].length > 0) {
      fieldSet();
    } else {
      console.log();
      return;
    }
  };

  const sleep = (ms) => {
    return new Promise((r) => setTimeout(r, ms));
  };

  const setPromise = () => {
    console.log('lennnn', fieldCtx.allCoords[0].length);
    if (
      fieldCtx.isPause ||
      fieldCtx.allCoords[0].length < 1 ||
      !fieldCtx.isSocket ||
      !fieldCtx.isBuffered
    ) {
      return;
    }
    sleep(100)
      .then(() => {
        console.log('첫번째 then', fieldCtx.playIndex);
        fieldSet();
      })
      .then(() => {
        console.log('두번쨰 then', fieldCtx.playIndex);
        fieldCtx.setPlayIndex((prev) => prev + 1);
        fieldCtx.setAccumulate((prev) => prev - 1);
        if (fieldCtx.accumulate < 10) {
          fieldCtx.setIsBuffered(false);
        }
      });
  };

  /*
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
   */
  useEffect(() => {
    // setInterval(IntervalContinue, 100);
    // fieldSet();
    setPromise();
  }, [
    fieldCtx.isSocket,
    fieldCtx.isPause,
    fieldCtx.playIndex,
    fieldCtx.isBuffered,
  ]);
  return <canvas className={styles.canvas2} ref={canvasRef2} />;
}
export default CoordsSet;
