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
  // const [ctx2, setCtx2] = useState();
  const [ctx3, setCtx3] = useState();

  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('black');
  const [brushSize, setBrushSize] = useState('1');
  const [prevData, setPrevData] = useState([0, 0, 0, '']);
  const [isMoving, setIsMoving] = useState(false);

  const [timeRange, setTimeRange] = useState(0);
  // 재생할 인덱스
  // const [playI, setPlayI] = useState(-1);
  const [playIndex, setPlayIndex] = useState(-1);
  ////1. 일시정지(재생), 3. 뒤로가기, 4.앞으로 가기
  const [isPause, setIsPause] = useState(false);
  ////

  const [coord, setCoord] = useState(null);
  const [coords, setCoords] = useState({
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  });
  const [nowD, setNowD] = useState(-1);
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
  let playI = -1;
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

  const HandlePause = () => {
    console.log('여기');
    if (isPause) {
      console.log('정지상태 => 다시재생');
      setIsPause((prev) => {
        return false;
      });
      ctx3.clearRect(0, 0, window.innerWidth, window.innerHeight);
      setDuplication({
        0: [-1, -1],
        1: [-1, -1],
        2: [-1, -1],
        3: [-1, -1],
        4: [-1, -1],
        5: [-1, -1],
      });
    } else {
      console.log('재생중 => 정지');
      setIsPause((prev) => {
        return true;
      });
    }
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

  const fieldSet = () => {
    const canvas2 = canvasRef2.current;
    canvas2.width = canvasWidth;
    canvas2.height = canvasHeigth;
    const context2 = canvas2.getContext('2d');

    if (context2 && coords) {
      setPlayIndex((prev) => {
        return prev + 1;
      });
      console.log('playIndex', playIndex);
      playI += 1;
      context2.clearRect(0, 0, window.innerWidth, window.innerHeight);
      console.log('coords[0]', coords[0]);
      console.log('coords[0][0]', coords[0][playI]);
      console.log('coords[0][0][0]', coords[0][playI][0]);
      for (let i = 0; i < 6; i++) {
        const x = coords[i][playI][0];
        const y = coords[i][playI][1];

        context2.moveTo(x, y);
        context2.beginPath();
        context2.arc(x, y, 15, 0, Math.PI * 2, true);
        context2.fillStyle = colors[i];
        context2.fill();
        context2.stroke();
      }
    }
  };

  let nowI = -1;
  const playerClick = ({ nativeEvent }) => {
    setNowD(-1);
    if (!coord) {
      return;
    }
    const x = nativeEvent.targetTouches[0].clientX;
    const y = nativeEvent.targetTouches[0].clientY;

    //// 복제한 좌표 다시 클릭할 때
    for (let i = 0; i < 6; i++) {
      const circleX = duplication[i][0];
      const circleY = duplication[i][1];
      const distance = Math.sqrt((circleX - x) ** 2 + (circleY - y) ** 2);

      if (distance < 15) {
        nowI = i;
        setNowD(i);
        duplication[i][0] = x;
        duplication[i][1] = y;
        startMoving();
        return;
      }
    }

    ////
    for (let i = 0; i < 6; i++) {
      const circleX = coords[i][playI][0];
      const circleY = coords[i][playI][1];
      // r = sqrt((x-x)^2 +)

      const distance = Math.sqrt((circleX - x) ** 2 + (circleY - y) ** 2);

      if (distance < 15) {
        nowI = i;
        setNowD(i);
        duplication[i][0] = coords[i][playI][0];
        duplication[i][0] = coords[i][playI][1];
        startMoving();
        break;
      }
    }
    if (nowI === -1) {
      finishMoving();
      return;
    }
  };

  const IntervalContinue = () => {
    if (!isPause && coords[0].length > 0) {
      // console.log('IntervalContinue, 재생중');
      fieldSet();
    } else {
      // console.log('IntervalContinue 일시정지');
      return;
    }
  };

  /// 복제 좌표 그리기
  function duplicationHandler({ nativeEvent }) {
    console.log('nowD', nowD);
    if (!ctx3) {
      return;
    }
    const { clientX, clientY } = nativeEvent.changedTouches[0];
    if (!isMoving) {
      ctx3.moveTo(clientX, clientY);
    } else if (nowD > -1) {
      ctx3.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = 0; i < 6; i++) {
        // 이전에 만든 복제 원
        if (i in duplication && i !== nowD) {
          const x = duplication[i][0];
          const y = duplication[i][1];
          ctx3.beginPath();
          ctx3.moveTo(clientX, clientY);
          ctx3.beginPath();

          ctx3.arc(x, y, 15, 0, Math.PI * 2, true);
          ctx3.font = '25px Arial';
          ctx3.fillText(i, x - 7.5, y - 6);
          ctx3.fillStyle = colors[i];
          ctx3.globalAlpha = 0.5;
          ctx3.fill();
          ctx3.stroke();
        } else if (i === nowD) {
          ///지금 움직이는 원
          ctx3.beginPath();
          duplication[i] = [clientX, clientY];
          const x = duplication[i][0];
          const y = duplication[i][1];

          ctx3.moveTo(clientX, clientY);
          ctx3.beginPath();

          ctx3.arc(x, y, 15, 0, Math.PI * 2, true);
          ctx3.font = '25px Arial';
          ctx3.fillText(i, x - 7.5, y - 7.5);
          ctx3.fillStyle = colors[i];
          ctx3.globalAlpha = 0.8;
          ctx3.fill();
          ctx3.stroke();
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

  const timeRangeHandler = (e) => {
    setTimeRange(e.target.value);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvasWidth;
    canvas.height = canvasHeigth;
    const context = canvas.getContext('2d');
    contextRef.current = context;
    setCtx(contextRef.current);

    const canvas3 = canvasRef3.current;
    canvas3.width = canvasWidth;
    canvas3.height = canvasHeigth;
    const context3 = canvas3.getContext('2d');
    setCtx3(context3);

    setInterval(IntervalContinue, 100);
  }, []);

  // 소켓
  const host = ipV4;
  const port = portinput;
  let ws = undefined;

  let disX = 0;
  let disY = 0; //x,y의 거리 값
  let fixelX = 40 / 1180; // 실제 거리 변환을 위한 값 -> 미터 단위
  let fixelY = 20 / 656;
  let nowDistance = 0;
  let totalDistance = Array.from({ length: 6 }, () => 0);
  let fpsTime = 0.005; //프레임 컴퓨터에서 계산하는 속도? 5ms -> 나중엔 받아서 변경
  let userXInfo = Array.from({ length: 6 }, () => 0);
  let userYInfo = Array.from({ length: 6 }, () => 0); //이전 유저의 x,y 좌표값

  const socketStart = () => {
    console.log('connecting....');
    if (ws === undefined) {
      ws = new WebSocket('ws://' + host + ':' + port + '/ws');
      ws.onopen = () => {
        console.log('connected!!');
      };
      ws.onmessage = (message) => {
        //server to client
        const coordData = JSON.parse(message.data);
        setCoord(JSON.parse(message.data));
        for (let i = 0; i < 6; i++) {
          if (i in coordData) {
            //user x,y
            const x = parseFloat(
              coordData[i][0] * canvasWidth + canvasWidth / 2
            );
            const y = parseFloat(
              coordData[i][1] * canvasHeigth - canvasHeigth / 2
            );
            coords[i].push([x, y]);

            //이전 값이 있다면 거리 계산
            if (userXInfo[i] != null && userYInfo[i] != null) {
              disX = Math.abs(x * fixelX - userXInfo[i]);
              disY = Math.abs(y * fixelY - userYInfo[i]);
              nowDistance = Math.sqrt(disX * disX + disY * disY);
              if (((nowDistance / fpsTime) * 360) / 1000 < 44) {
                //속도가 정상 속도면 거리 합 진행
                totalDistance[i] += Math.sqrt(disX * disX + disY * disY);
                console.log('현재 거리 합' + i + ' : ' + totalDistance[i]);
              }
            }
            userXInfo[i] = x * fixelX;
            userYInfo[i] = y * fixelY;
          } else if (coords[i].length > 1) {
            coords[i].push([coords[i].at(-1)[0], coords[i].at(-1)[1]]);
          } else {
            coords[i].push([0, 0]);
          }
        }
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
        <button onClick={HandlePause}>{isPause ? '시작' : '일시정지'}</button>
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
          onTouchEnd={() => {
            finishDrawing();
            finishMoving();
          }}
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
      <input
        type="range"
        id="timeRange"
        name="timeRange"
        className={styles.time_range}
        min="0"
        // max="100"
        max={coords[0].length}
        value={timeRange}
        onChange={(e) => timeRangeHandler(e)}
        step="5"
      />
    </div>
  );
}
export default FieldPage;
