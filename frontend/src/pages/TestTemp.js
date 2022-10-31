//https://velog.io/@mokyoungg/React-React%EC%97%90%EC%84%9C-Canvas-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0%EB%A7%88%EC%9A%B0%EC%8A%A4-%EA%B7%B8%EB%A6%AC%EA%B8%B0
import UserContext from '../context/UserContext';
import React, { useEffect, useRef, useState, useContext } from 'react';
import styles from './TestTemp.module.css';
import SoccerField from '../components/FieldPage/SoccerField';

function TestTemp() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const canvasRef2 = useRef(null);
  const contextRef2 = useRef(null);
  const {ipV4, portinput } = useContext(UserContext)
  const [ctx, setCtx] = useState();
  const [ctx2, setCtx2] = useState();

  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('black');
  const [brushSize, setBrushSize] = useState('1');
  const [prevData, setPrevData] = useState([0, 0, 0, '']);

  const canvasWidth = window.innerWidth;
  const canvasHeigth = window.innerHeight;

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
  const dumpData = {
    1: [
      [10, 10],
      [11, 10],
      [12, 11],
      [13, 12],
      [12, 11],
      [12, 10],
      [13, 11],
      [14, 12],
      [15, 13],
      [16, 14],
      [16, 15],
    ],
    2: [
      [40, 40],
      [42, 42],
      [43, 43],
      [45, 45],
      [47, 47],
      [47, 49],
      [47, 50],
      [45, 50],
      [43, 50],
      [42, 49],
      [41, 48],
    ],
  };
  let i = 0;
  const field_set = () => {
    if (i >= dumpData[1].length - 1) {
      return;
    } else if (ctx2) {
      ctx2.clearRect(0, 0, window.innerWidth, window.innerHeight);
      i += 1;
      const [x, y] = dumpData[1][i];
      ctx2.beginPath();
      ctx2.arc(
        dumpData[1][i][0] * 10,
        dumpData[1][i][1] * 10,
        20,
        0,
        Math.PI * 2,
        true
      );
      ctx2.fillStyle = 'orange';
      ctx2.fill();
      ctx2.stroke();
      ///
      ctx2.moveTo(dumpData[2][i][0] * 10, dumpData[2][i][1] * 10);
      ctx2.beginPath();
      ctx2.arc(
        dumpData[2][i][0] * 10,
        dumpData[2][i][1] * 10,
        20,
        0,
        Math.PI * 2,
        true
      );
      ctx2.fillStyle = 'blue';
      ctx2.fill();
      ctx2.stroke();
    }
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
    canvas.width = canvasWidth;
    canvas.height = canvasHeigth;
    const context = canvas.getContext('2d');
    contextRef.current = context;
    setCtx(contextRef.current);

    const canvas2 = canvasRef2.current;
    canvas2.width = canvasWidth;
    canvas2.height = canvasHeigth;
    const context2 = canvas2.getContext('2d');
    setCtx2(context2);

    setInterval(field_set, 200);
  }, [ctx2]);

  // 소켓
  const host = ipV4
    const port = portinput
    let ws = undefined

    const socketStart = () => {
        console.log("connecting....")
        if(ws === undefined){
            ws = new WebSocket("ws://"+host+":"+port+"/ws");
            ws.onopen = () => {
              console.log("connected!!");
            };
            ws.onmessage = (message) => { //server to client
              console.log("message", message.data);
            };
            ws.onclose = function(){
                ws = undefined
                console.log("Server Disconnect..")
            };
            ws.onerror = function(message){
                console.log("error..")
            };
        }
    }

    const socketStop = () => {
        if(ws !== undefined){
            ws.close();
        }
    }
    
    const socketSend = () => { 
        if(ws !== undefined){
            ws.send("hello this is client Message"); //client to server
        }
    }

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
      <div> IP : { ipV4 } </div>
      <div> PORT : {portinput} </div>
      <div>
            <button onClick={socketStart}>소켓 시작</button>
            <button onClick={socketStop}>소켓 종료</button>
            <button onClick={socketSend}>소켓 전송</button>
        </div>
      <div className={styles.canvas_box}>
        <SoccerField />
        <canvas
          className={styles.canvas}
          ref={canvasRef}
          onTouchStart={(e) => {
            startDrawing();
            drawing(e);
          }}
          onTouchEnd={finishDrawing}
          onTouchMove={drawing}
          onTouchCancel={finishDrawing}
        />
        <canvas className={styles.canvas2} ref={canvasRef2} />
      </div>
    </div>
  );
}
export default TestTemp;
