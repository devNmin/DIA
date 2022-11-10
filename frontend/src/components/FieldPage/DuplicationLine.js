import React, { useEffect, useRef, useState, useContext } from 'react';
import fieldContext from '../../context/FieldContext';
import styles from './DuplicationLine.module.css';

function DuplicationLine() {
  const fieldCtx = useContext(fieldContext);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [ctx, setCtx] = useState();

  const canvasWidth = window.innerWidth;
  const canvasHeigth = window.innerHeight * 0.8;

  const allDraw = (ctx) => {
    if (!ctx) {
      return;
    }
    console.log('여기여기');
    for (let i = 0; i < 12; i++) {
      let dLength = fieldCtx.dupleLineCoords[i].length;
      if (dLength < 1 || fieldCtx.nowD === i) {
        console.log('여여');
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
  };

  const drawing = () => {
    if (!ctx) {
      return;
    }
    ////////////

    ////////////
    console.log('저장된거', fieldCtx.dupleLineCoords);
    if (fieldCtx.nowD < 0) {
      return;
    }
    if (!fieldCtx.ctxEvenet || !fieldCtx.duplicationEvent) {
      return;
    }
    const { clientX, clientY } = fieldCtx.ctxEvenet.changedTouches[0];

    if (ctx) {
      if (fieldCtx.ctxEvenet.type === 'touchstart') {
        // 터치 시작

        ctx.beginPath();
        ctx.moveTo(clientX, clientY);
      } else if (!fieldCtx.isMoving) {
        // 터치가 종료
        // console.log('ㅇㅅㄱ', fieldCtx.ctxEvenet);
        // console.log('ㅇㅅㄱ2222', lastC);
        // console.log('last Points ', lastC[0] + ' ' + lastC[1]);
        // console.log('clientX clienty ', clientX + ' ' + clientY);
        // var aWidth = 10;
        // var aLength = 10;
        // var dx = clientX - lastC[0];
        // var dy = clientY - lastC[1];
        // var angle = Math.atan2(dy, dx);
        // var length = Math.sqrt(dx * dx + dy * dy);
        // ctx.translate(lastC[0], lastC[1]);
        // ctx.rotate(angle);
        // ctx.beginPath();
        // console.log('angle ', angle);
        // //화살표 모양 만들기
        // ctx.moveTo(length - aLength, -aWidth);
        // ctx.lineTo(length, 0);
        // ctx.lineTo(length - aLength, aWidth);
        // ctx.fill();
        // ctx.setTransform(1, 0, 0, 1, 0, 0);
      } else {
        // 터치중

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
        ctx.lineWidth = 10;
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
    if (!fieldCtx.isPause && ctx) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    drawing();
    if (!fieldCtx.isMoving) {
      allDraw(ctx);
    }
  }, [
    fieldCtx.isMoving,
    fieldCtx.ctxEvenet,
    fieldCtx.isPause,
    fieldCtx.dupleLineCoords,
  ]);

  return <canvas className={styles.canvas4} ref={canvasRef} />;
}
export default DuplicationLine;
