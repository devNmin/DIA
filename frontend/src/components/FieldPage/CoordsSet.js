import styles from './CoordsSet.module.css';
import React, { useEffect, useRef, useState, useContext } from 'react';
import filedContext from '../../context/FieldContext';

function CoordsSet() {
  const fieldCtx = useContext(filedContext);
  const canvasRef2 = useRef(null);

  const canvasWidth = window.innerWidth;
  const canvasHeigth = window.innerHeight * 0.8;

  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

  const fieldSet = () => {
    const canvas2 = canvasRef2.current;
    canvas2.width = canvasWidth;
    canvas2.height = canvasHeigth;
    const context2 = canvas2.getContext('2d');
    ////
    console.log('fieldSet');
    console.log(
      'fieldCtx.isPause : ',
      fieldCtx.isPause,
      'fieldCtx.coords[0].length : ',
      fieldCtx.coords[0].length,
      'fieldCtx.maxIndex :',
      fieldCtx.maxIndex
    );
    console.log('playI', fieldCtx.playI);
    ////
    if (fieldCtx.isPause || fieldCtx.coords[0].length < 1) {
      console.log('여기 : fieldCtx.isPause || fieldCtx.coords[0].length < 1');
      return;
    }
    if (fieldCtx.playI < 0) {
      fieldCtx.setPlayI(0);
      console.log('fieldCtx.playI < 0');
      return;
    }

    console.log('여기는 되나..? fieldCtx.coords[0] ', fieldCtx.coords[0]);
    console.log(
      '여기는 되나..? fieldCtx.coords[0].length ',
      fieldCtx.coords[0].length
    ); // 왜... if문 위는 나와..?

    if (context2 && fieldCtx.coords[0]) {
      console.log('for문 전 : fieldCtx.coords :', fieldCtx.coords);
      context2.clearRect(0, 0, window.innerWidth, window.innerHeight);
      // i = 선수 번호

      for (let i of Object.keys(fieldCtx.coord)) {
        // for (let k of fieldCtx.coords[i]) {
        //   console.log('나와라~~~~ ', k);
        // }
        console.log('for문 안0 : playI : ', fieldCtx.playI);
        console.log('for문 안1 : coords[i] : ', fieldCtx.coords[i]);
        console.log('길이는?', fieldCtx.coords[i].length);
        console.log('for문 안1.1 : coords[i][0] : ', fieldCtx.coords[i][0]);
        console.log('for문 안1.2 : coords[i][1] : ', fieldCtx.coords[i][1]);
        console.log(
          'for문 안1.3: fieldCtx.coords[i][0][0]',
          fieldCtx.coords[i][0][0]
        );
        console.log('or문 안2 : ', fieldCtx.coords[i][fieldCtx.playI]);
        console.log('for문 안3 :', fieldCtx.coords[i][fieldCtx.playI][0]);
        console.log('zzz', fieldCtx.coords[i][0][1]);
        const x = fieldCtx.coords[i][fieldCtx.playI][0];
        const y = fieldCtx.coords[i][fieldCtx.playI][1];
        console.log(x, y);

        context2.moveTo(x, y);
        context2.beginPath();
        context2.arc(x, y, 15, 0, Math.PI * 2, true);
        context2.fillStyle = colors[i];
        context2.fill();
        context2.stroke();
      }

      fieldCtx.setPlayI((prev) => prev + 1);

      /// context test
    }
  };

  const IntervalContinue = () => {
    if (!fieldCtx.isPause && fieldCtx.coords[0].length > 0) {
      fieldSet();
    } else {
      return;
    }
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
    setInterval(IntervalContinue, 100);
    // fieldSet();
  }, [fieldCtx.isSocket, fieldCtx.isPause, fieldCtx.playI]);
  return <canvas className={styles.canvas2} ref={canvasRef2} />;
}
export default CoordsSet;
