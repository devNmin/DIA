import styles from './CoordsSet.module.css';
import React, { useEffect, useRef, useState, useContext } from 'react';
import filedContext from '../../context/FieldContext';
import BufferComponent from './FieldTools/BufferComponent';

function CoordsSet() {
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
    'pink',
    'pink',
    'pink',
    'pink',
    'pink',
    'pink',
  ];
  const textColor = [
    'white',
    'white',
    'white',
    'white',
    'white',
    'white',
    'black',
    'black',
    'black',
    'black',
    'black',
    'black',
  ];

  const fieldSet = () => {
    const canvas2 = canvasRef2.current;
    canvas2.width = canvasWidth;
    canvas2.height = canvasHeigth;
    const context2 = canvas2.getContext('2d');

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

        context2.moveTo(x, y);
        context2.beginPath();
        context2.arc(x, y, 15, 0, Math.PI * 2, true);
        context2.fillStyle = colors[i];
        context2.fill();
        context2.stroke();

        context2.font = '1.2rem Arial';
        context2.fillStyle = textColor[i];
        context2.textAlign = 'center';
        context2.textBaseline = 'hanging';

        context2.fillText(i, x, y - 7);
      }
    }
  };

  const sleep = (ms) => {
    return new Promise((r) => setTimeout(r, ms));
  };

  const setPromise = () => {
    if (fieldCtx.isTimeChanged) {
      fieldCtx.setAccumulate(fieldCtx.maxIndex - fieldCtx.playTime);
      fieldCtx.setIsBuffered(true);
      fieldCtx.setPlayIndex(fieldCtx.playTime);
      fieldCtx.setIsTimeChanged(false);

      return;
    }
    if (
      fieldCtx.isPause ||
      fieldCtx.allCoords[0].length < 1 ||
      !fieldCtx.isBuffered
    ) {
      return;
    }

    sleep(100)
      .then(() => {
        fieldSet();
      })
      .then(() => {
        fieldCtx.setPlayIndex((prev) => prev + 1);
        fieldCtx.setAccumulate((prev) => prev - 1);
        if (fieldCtx.accumulate < 10) {
          fieldCtx.setIsBuffered(false);
        }
      });
  };

  useEffect(() => {
    setPromise();
  }, [
    fieldCtx.isSocket,
    fieldCtx.isPause,
    fieldCtx.playIndex,
    fieldCtx.isBuffered,
  ]);

  return (
    <div>
      <canvas className={styles.canvas2} ref={canvasRef2} />
      {fieldCtx.isBuffered ? null : (
        <div>
          <BufferComponent />
          <div className={styles.gray_box}></div>
        </div>
      )}
    </div>
  );
}
export default CoordsSet;
