//https://velog.io/@mokyoungg/React-React%EC%97%90%EC%84%9C-Canvas-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0%EB%A7%88%EC%9A%B0%EC%8A%A4-%EA%B7%B8%EB%A6%AC%EA%B8%B0
import React, { useEffect, useRef, useState } from 'react';
import styles from './TestTemp.module.css';
function TestTemp() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const fieldCanvasRef = useRef(null);
  const fieldContextRef = useRef(null);

  const [ctx, setCtx] = useState();
  const [fieldCtx, setFieldCtx] = useState();
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('black');
  const [brushSize, setBrushSize] = useState('1');
  const [prevData, setPrevData] = useState([0, 0, 0, '']);

  const startDrawing = () => {
    setIsDrawing(true);
  };
  const finishDrawing = () => {
    setIsDrawing(false);
  };

  const drawing = ({ nativeEvent }) => {
    const { clientX, clientY } = nativeEvent.changedTouches[0];
    const timestamp = nativeEvent.timeStamp;

    setPrevData((prev) => [prev[0], prev[1], prev[2], nativeEvent.type]);
    if (prevData) {
      if (
        Math.abs(timestamp - prevData[0]) < 15 &&
        (Math.abs(prevData[1] - clientX) > 10 ||
          Math.abs(prevData[2] - clientY) > 10)
      ) {
        return;
      }

      if (
        prevData[3] === 'touchstart' &&
        nativeEvent.type === 'touchmove' &&
        (Math.abs(timestamp - prevData[0]) > 10 ||
          Math.abs(prevData[1] - clientX) > 1 ||
          Math.abs(prevData[2] - clientY) > 1)
      ) {
        return;
      }
    }

    if (ctx) {
      setPrevData((prev) => [timestamp, clientX, clientY, prev[3]]);

      if (!isDrawing) {
        ctx.beginPath();
        ctx.moveTo(clientX, clientY);
      } else {
        ctx.lineTo(clientX, clientY);
        ctx.strokeStyle = brushColor;
        ctx.lineWidth = brushSize;
        if (
          nativeEvent.targetTouches.length > 1 ||
          (nativeEvent.type === 'touchstart' && prevData[3] === 'touchstart')
        ) {
          return;
        }
        ctx.stroke();
      }
    }
  };
  //////////////////
  const dumpData = [
    [10, 10],
    [11, 10],
    [12, 11],
    [13, 12],
    [12, 11],
    [12, 10],
  ];
  const field_set = (data) => {
    const { x, y } = data;
    fieldCtx.beginPath();
    fieldCtx.arc(x, y, 0, Math.PI * 2);
    fieldCtx.stroke();
  };
  ///////////////////
  function brushColorHandler(e) {
    setBrushColor(e.target.value);
  }
  function brushSizeHandler(e) {
    setBrushSize(e.target.value);
  }
  function canvasClear() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext('2d');
    contextRef.current = context;
    setCtx(contextRef.current);
    const fieldCanvas = fieldCanvasRef.current;
    fieldCanvas.width = window.innerWidth;
    fieldCanvas.height = window.innerHeight;
    const fieldContext = fieldCanvas.getContext('2d');
    fieldCanvasRef.current = fieldContext;
    setFieldCtx(fieldContextRef.current);
  }, []);

  return (
    <div className={styles.size}>
      <div className={styles.toolbox}>
        <input
          type="color"
          id="brushColor"
          onChange={(e) => {
            brushColorHandler(e);
          }}
        />
        <input
          type="range"
          min="1"
          max="21"
          step="4"
          value={brushSize}
          id="brushSize"
          onChange={(e) => {
            brushSizeHandler(e);
          }}
        />
        <button onClick={canvasClear}>전체지우기</button>
      </div>
      <div className={styles.canvas_box}>
        <canvas
          ref={canvasRef}
          onTouchStart={(e) => {
            startDrawing();
            drawing(e);
          }}
          onTouchEnd={finishDrawing}
          onTouchMove={drawing}
          onTouchCancel={finishDrawing}
        />
        <canvas className={styles.field_canvas} ref={fieldCanvasRef} />
      </div>
    </div>
  );
}
export default TestTemp;
