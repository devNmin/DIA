import React, { useEffect, useRef, useState, useContext } from 'react';
import fieldContext from '../../context/FieldContext';
import styles from './DuplicationLine.module.css';

function DuplicationLine() {
  const fieldCtx = useContext(fieldContext);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [ctx, setCtx] = useState();
  const [isStart, setIsStart] = useState(false);

  const canvasWidth = window.innerWidth;
  const canvasHeigth = window.innerHeight * 0.8;

  const allDraw = (ctx) => {
    if (!ctx) {
      return;
    }
    for (let i = 0; i < 12; i++) {
      let dLength = fieldCtx.dupleLineCoords[i].length;
      if (dLength < 2) {
        continue;
      }
      let dx = 0; //이전 x
      let dy = 0; //이전 y
      let nx = 0; //현재 x
      let ny = 0; //현재 y
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let j = 1; j < dLength; j++) {
        dx = fieldCtx.dupleLineCoords[i][j - 1][0];
        dy = fieldCtx.dupleLineCoords[i][j - 1][1];
        nx = fieldCtx.dupleLineCoords[i][j][0];
        ny = fieldCtx.dupleLineCoords[i][j][1];
        ctx.moveTo(dx, dy);
        ctx.lineTo(nx, ny);
        ctx.stroke();
      }
    }
    //// 화살표 그리기
    for (let i = 0; i < 12; i++) {
      let dLength = fieldCtx.dupleLineCoords[i].length;
      if (dLength < 10) {
        continue;
      }
      let offset = 10;
      let aWidth = 20;
      let aLength = 20;
      let bx =
        fieldCtx.dupleLineCoords[i][dLength - 1][0] -
        fieldCtx.dupleLineCoords[i][dLength - offset][0];
      let by =
        fieldCtx.dupleLineCoords[i][dLength - 1][1] -
        fieldCtx.dupleLineCoords[i][dLength - offset][1];
      let angle = Math.atan2(by, bx);
      let length = Math.sqrt(bx * bx + by * by);
      ctx.translate(
        fieldCtx.dupleLineCoords[i][dLength - offset][0],
        fieldCtx.dupleLineCoords[i][dLength - offset][1]
      );

      ctx.rotate(angle);
      ctx.beginPath();

      //화살표 모양 만들기
      ctx.moveTo(length - aLength, -aWidth);
      ctx.lineTo(length, 0);
      ctx.lineTo(length - aLength, aWidth);
      ctx.stroke();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
  };

  const drawing = () => {
    if (!ctx || fieldCtx.nowD < 0 || !fieldCtx.duplicationEvent) {
      return;
    }

    const { clientX, clientY } = fieldCtx.ctxEvenet.changedTouches[0];

    if (ctx) {
      if (fieldCtx.ctxEvenet.type === 'touchstart') {
        // 터치 시작
        setIsStart(false);
        ctx.beginPath();
        ctx.moveTo(clientX, clientY);
      } else if (isStart && fieldCtx.ctxEvenet.type === 'touchmove') {
        setIsStart(false);
        ctx.beginPath();
        ctx.moveTo(clientX, clientY);
      } else {
        // 터치중
        // 선 색 후보 '#B3DC3C'
        fieldCtx.setDupleLineCoords((prev) => {
          let now = prev;
          now[fieldCtx.nowD].push([
            fieldCtx.ctxEvenet.targetTouches[0].clientX,
            fieldCtx.ctxEvenet.targetTouches[0].clientY,
          ]);
          return now;
        });
        ctx.lineTo(clientX, clientY);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    }
  };

  useEffect(() => {
    if (!ctx) {
      const canvas = canvasRef.current;
      canvas.width = canvasWidth;
      canvas.height = canvasHeigth;
      const context = canvas.getContext('2d');
      contextRef.current = context;
      setCtx(() => contextRef.current);
    }
    setIsStart(true);
    if (!fieldCtx.isPause && ctx) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    drawing();
    if (!fieldCtx.isMoving) {
      allDraw(ctx);
    }
  }, [
    fieldCtx.ctxEvenet,
    fieldCtx.dupleLineCoords,
    fieldCtx.isMoving,
    fieldCtx.isPause,
  ]);

  return <canvas className={styles.canvas4} ref={canvasRef} />;
}
export default DuplicationLine;
