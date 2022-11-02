//https://velog.io/@mokyoungg/React-React%EC%97%90%EC%84%9C-Canvas-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0%EB%A7%88%EC%9A%B0%EC%8A%A4-%EA%B7%B8%EB%A6%AC%EA%B8%B0
import UserContext from '../context/UserContext';
import React, { useEffect, useRef, useState, useContext } from 'react';
import styles from './FieldPage.module.css';
import SoccerField from '../components/FieldPage/SoccerField';

function FieldPage() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const canvasRef2 = useRef(null);
  const canvasRef3 = useRef(null);

  const { ipV4, portinput } = useContext(UserContext);
  const [ctx, setCtx] = useState();
  const [ctx2, setCtx2] = useState();
  const [ctx3, setCtx3] = useState();

  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('black');
  const [brushSize, setBrushSize] = useState('1');
  const [prevData, setPrevData] = useState([0, 0, 0, '']);
  const [isMoving, setIsMoving] = useState(false);

  /// 테스트를 위해 첫 좌표 더미 넣어둠!!!!!!!!
  const [coord, setCoord] = useState(null);
  const [coords, setCoords] = useState({
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  });
  const [duplication, setDuplication] = useState({
    0: [-1, -1],
    1: [-1, -1],
    2: [-1, -1],
    3: [-1, -1],
    4: [-1, -1],
    5: [-1, -1],
  });
  const canvasWidth = window.innerWidth;
  const canvasHeigth = window.innerHeight * 0.8;

  const startDrawing = () => {
    setIsDrawing(true);
  };
  const finishDrawing = () => {
    setIsDrawing(false);
  };

  const startMoving = () => {
    setIsMoving(true);
  };
  const finishMoving = () => {
    setIsMoving(false);
  };

  const drawing = ({ nativeEvent }) => {
    if (isMoving) {
      return;
    }
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
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
  const field_set = () => {
    /// for더미
    if (!coord) {
      setCoord({
        0: [-0.23, 0.8],
        1: [-0.19, 0.7],
        2: [-0.18, 0.6],
        3: [-0.15, 0.7],
      });
    }

    if (isMoving) {
      return;
    }

    console.log('여기');
    if (ctx2 && coord) {
      console.log(coord);
      console.log('여기2');
      ctx2.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = 0; i < 6; i++) {
        if (i in coord) {
          const x = coord[i][0] * canvasWidth + canvasWidth / 2;
          const y = coord[i][1] * canvasHeigth - canvasHeigth / 2;
          coords[i].push([x, y]);

          ctx2.moveTo(x, y);
          ctx2.beginPath();
          ctx2.arc(x, y, 15, 0, Math.PI * 2, true);
          ctx2.fillStyle = colors[i];
          ctx2.fill();
          ctx2.stroke();
        } else if (coords.length > 0) {
          console.log('이게 동작하기는 하나?');
          const x = coords[i].at(-1)[0] * canvasWidth;
          const y = coords[i].at(-1)[1] * canvasHeigth;
          coords[i].push([x, y]);

          ctx2.moveTo(x, y);
          ctx2.beginPath();
          ctx2.arc(x, y, 15, 0, Math.PI * 2, true);
          ctx2.fillStyle = colors[i];
          ctx2.fill();
          ctx2.stroke();
        }
      }
    }
  };

  const playerClick = ({ nativeEvent }) => {
    if (!coord) {
      return;
    }
    const x = nativeEvent.targetTouches[0].clientX;
    const y = nativeEvent.targetTouches[0].clientY;
    let nowI = -1;
    console.log('잉?', x, y, nativeEvent);
    //// 복제한 좌표 다시 클릭할 때
    for (let i = 0; i < 6; i++) {
      const circleX = duplication[i][0];
      const circleY = duplication[i][1];
      // r = sqrt((x-x)^2 +)
      const distance = Math.sqrt((circleX - x) ** 2 + (circleY - y) ** 2);

      if (distance < 15) {
        nowI = i;
        startMoving();
        return;
      }
    }
    ////
    for (let i = 0; i < 6; i++) {
      const circleX = coord[i][0] * canvasWidth + canvasWidth / 2;
      const circleY = coord[i][1] * canvasHeigth - canvasHeigth / 2;
      // r = sqrt((x-x)^2 +)
      const distance = Math.sqrt((circleX - x) ** 2 + (circleY - y) ** 2);

      if (distance < 15) {
        nowI = i;
        duplication[nowI][0] = coord[nowI][0] * canvasWidth + canvasWidth / 2;
        duplication[nowI][1] = coord[nowI][1] * canvasHeigth - canvasHeigth / 2;
        startMoving();
        break;
      }
    }
    if (nowI === -1) {
      return;
    }
    console.log('nowI???', nowI);
  };
  function duplicationHandler({ nativeEvent }) {
    if (!ctx3) {
      return;
    }
    const { clientX, clientY } = nativeEvent.changedTouches[0];
    if (!isMoving) {
      ctx3.beginPath();
      ctx3.moveTo(clientX, clientY);
    } else {
      console.log('moving');
      ctx3.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = 0; i < 6; i++) {
        if (i in duplication && duplication[i][0] > 0) {
          console.log(i);
          const x = duplication[i][0] * canvasWidth + canvasWidth / 2;
          const y = duplication[i][1] * canvasHeigth - canvasHeigth / 2;

          ctx3.beginPath();
          ctx3.moveTo(clientX, clientY);
          ctx3.arc(clientX, clientY, 15, 0, Math.PI * 2, true);
          ctx3.font = '25px Arial';
          ctx3.fillText(i, clientX - 7.5, clientY - 7.5);
          ctx3.fillStyle = colors[i];
          ctx3.globalAlpha = 0.2;
          ctx3.fill();
          ctx3.stroke();
          duplication[i] = [clientX, clientY];
        }
      }
    }
  }
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

    const canvas3 = canvasRef3.current;
    canvas3.width = canvasWidth;
    canvas3.height = canvasHeigth;
    const context3 = canvas3.getContext('2d');
    setCtx3(context3);

    field_set();
  }, [coord]);

  // 소켓
  const host = ipV4;
  const port = portinput;
  let ws = undefined;

  const socketStart = () => {
    console.log('connecting....');
    if (ws === undefined) {
      ws = new WebSocket('ws://' + host + ':' + port + '/ws');
      ws.onopen = () => {
        console.log('connected!!');
      };
      ws.onmessage = (message) => {
        //server to client
        console.log('message', message.data);
        setCoord(JSON.parse(message.data));
      };
      ws.onclose = function () {
        ws = undefined;
        console.log('Server Disconnect..');
      };
      ws.onerror = function (message) {
        console.log('error..');
      };
    }
  };

  const socketStop = () => {
    if (ws !== undefined) {
      ws.close();
    }
  };

  const socketSend = () => {
    if (ws !== undefined) {
      ws.send('hello this is client Message'); //client to server
    }
  };

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
        <div className={styles.socketGroup}>
          <div> IP : {ipV4} </div>
          <div> PORT : {portinput} </div>
          <div>
            <button onClick={socketStart}>소켓 시작</button>
            <button onClick={socketStop}>소켓 종료</button>
            <button onClick={socketSend}>소켓 전송</button>
          </div>
        </div>
      </div>

      <div className={styles.canvas_box}>
        <SoccerField />
        <canvas
          className={styles.canvas}
          ref={canvasRef}
          onTouchStart={(e) => {
            startDrawing();
            drawing(e);
            playerClick(e);
          }}
          onTouchEnd={finishDrawing}
          onTouchMove={(e) => {
            drawing(e);
            duplicationHandler(e);
          }}
          onTouchCancel={() => {
            finishDrawing();
            finishMoving();
          }}
        />
        <canvas className={styles.canvas3} ref={canvasRef3} />
        <canvas className={styles.canvas2} ref={canvasRef2} />
      </div>
    </div>
  );
}
export default FieldPage;
