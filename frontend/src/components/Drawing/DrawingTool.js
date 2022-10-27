//https://velog.io/@mokyoungg/React-React%EC%97%90%EC%84%9C-Canvas-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0%EB%A7%88%EC%9A%B0%EC%8A%A4-%EA%B7%B8%EB%A6%AC%EA%B8%B0

import React, { useEffect, useRef, useState } from 'react';
import styles from './DrawingTool.module.css';
function DrawingTool() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [ctx, setCtx] = useState();
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingResult, setDrawingResult] = useState([]);
  const [brushColor, setBrushColor] = useState('black');
  const [brushSize, setBrushSize] = useState('1');

  const startDrawing = () => {
    setIsDrawing(true);
  };
  const finishDrawing = () => {
    setIsDrawing(false);
  };

  const drawing = ({ nativeEvent }) => {
    console.log('event', nativeEvent);
    // console.log('changed', nativeEvent.changedTouches);
    const { clientX, clientY } = nativeEvent.changedTouches[0];
    if (ctx) {
      console.log(isDrawing);
      if (!isDrawing) {
        ctx.beginPath();
        ctx.moveTo(clientX, clientY);
      } else {
        ctx.lineTo(clientX, clientY);
        ctx.strokeStyle = brushColor;
        ctx.lineWidth = brushSize;
        ctx.stroke();
        console.log('stroke');
      }
    }
  };

  //
  function brushColorHandler(e) {
    setBrushColor(e.target.value);
  }
  function brushSizeHandler(e) {
    console.log(e.target.value);
    setBrushSize(e.target.value);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext('2d');

    contextRef.current = context;
    setCtx(contextRef.current);
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
      </div>
      <canvas
        ref={canvasRef}
        // onMouseDown={startDrawing}
        // onMouseUp={finishDrawing}
        // onMouseMove={drawing}
        // onMouseLeave={finishDrawing}
        onTouchStart={(e) => {
          startDrawing();
          drawing(e);
        }}
        onTouchEnd={finishDrawing}
        onTouchMove={drawing}
        onTouchCancel={finishDrawing}
      ></canvas>
    </div>
  );
}
export default DrawingTool;
