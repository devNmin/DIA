//https://velog.io/@mokyoungg/React-React%EC%97%90%EC%84%9C-Canvas-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0%EB%A7%88%EC%9A%B0%EC%8A%A4-%EA%B7%B8%EB%A6%AC%EA%B8%B0
import UserContext from '../context/UserContext';
import fieldContext from '../context/FieldContext';
import React, { useEffect, useRef, useState, useContext } from 'react';
import styles from './FieldPage.module.css';
import SoccerField from '../components/FieldPage/SoccerField';
import CoordsSet from '../components/FieldPage/CoordsSet';
import DuplicationPlayer from '../components/FieldPage/DuplicationPlayer';
import TimeRange from '../components/FieldPage/TimeRange';
import PlayInputGroup from '../components/FieldPage/PlayInputGroup';
import DuplicationLine from '../components/FieldPage/DuplicationLine';

function FieldPage() {
  const { ipV4, portinput } = useContext(UserContext);
  const fieldCtx = useContext(fieldContext);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [ctx, setCtx] = useState();

  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#F5DF4D');
  const [brushSize, setBrushSize] = useState('1');

  const canvasWidth = window.innerWidth;
  const canvasHeigth = window.innerHeight * 0.8;

  const startDrawing = () => {
    setIsDrawing(() => true);
  };
  const finishDrawing = () => {
    setIsDrawing(() => false);
  };

  const drawing = ({ nativeEvent }) => {
    fieldCtx.setCtxEvent(nativeEvent);
    if (!nativeEvent || fieldCtx.isMoving || fieldCtx.playIndex < 0) {
      return;
    }
    const { clientX, clientY } = nativeEvent.changedTouches[0];
    const timestamp = nativeEvent.timeStamp;
    fieldCtx.setPrevData((prev) => [
      prev[0],
      prev[1],
      prev[2],
      nativeEvent.type,
    ]);
    if (fieldCtx.prevData) {
      if (
        Math.abs(timestamp - fieldCtx.prevData[0]) < 15 &&
        (Math.abs(fieldCtx.prevData[1] - clientX) > 10 ||
          Math.abs(fieldCtx.prevData[2] - clientY) > 10)
      ) {
        return;
      }

      if (
        fieldCtx.prevData[3] === 'touchstart' &&
        nativeEvent.type === 'touchmove' &&
        (Math.abs(timestamp - fieldCtx.prevData[0]) > 10 ||
          Math.abs(fieldCtx.prevData[1] - clientX) > 1 ||
          Math.abs(fieldCtx.prevData[2] - clientY) > 1)
      ) {
        return;
      }
    }

    if (ctx) {
      fieldCtx.setPrevData((prev) => [timestamp, clientX, clientY, prev[3]]);
      if (!isDrawing) {
        ctx.beginPath();
        ctx.moveTo(clientX, clientY);
      } else {
        ctx.lineTo(clientX, clientY);
        ctx.strokeStyle = brushColor;
        ctx.lineWidth = brushSize;
        if (
          nativeEvent.targetTouches.length > 1 ||
          (nativeEvent.type === 'touchstart' &&
            fieldCtx.prevData[3] === 'touchstart')
        ) {
          return;
        }
        ctx.stroke();
      }
    }
  };

  // 플레이어 클릭했는지 확인하는 함수
  let nowI = -1;
  const playerClick = ({ nativeEvent }) => {
    if (fieldCtx.playIndex < 1) {
      return;
    }

    fieldCtx.setNowD(() => -1);
    const x = nativeEvent.targetTouches[0].clientX;
    const y = nativeEvent.targetTouches[0].clientY;

    //// 복제한 좌표 다시 클릭할 때
    for (let i = 0; i < 12; i++) {
      const circleX = fieldCtx.duplication[i][0];
      const circleY = fieldCtx.duplication[i][1];
      const distance = Math.sqrt((circleX - x) ** 2 + (circleY - y) ** 2);
      // 원래 distance < 15 였는데 넉넉하게 바꿔줌
      if (distance < 17) {
        nowI = i;
        fieldCtx.setNowD(() => i);
        fieldCtx.duplication[i][0] = x;
        fieldCtx.duplication[i][1] = y;
        fieldCtx.setIsMoving(() => true);
        return;
      }
    }
    //// 플레이어 클릭시
    let minDistance = 1000;
    let minIdx = 0;
    for (let i = 0; i < 12; i++) {
      const circleX = fieldCtx.allCoords[i][fieldCtx.playIndex][0];
      const circleY = fieldCtx.allCoords[i][fieldCtx.playIndex][1];
      const distance = Math.sqrt((circleX - x) ** 2 + (circleY - y) ** 2);

      if (distance < minDistance) {
        minDistance = distance;
        minIdx = i;
      }
    }
    if (minDistance < 17) {
      fieldCtx.setIsPause(true);
      fieldCtx.setDupleLineCoords((prev) => {
        let now = prev;
        now[minIdx] = [];
        return now;
      });
      nowI = minIdx;
      console.log('nowI', nowI);
      fieldCtx.setNowD(minIdx);
      fieldCtx.duplication[minIdx][0] =
        fieldCtx.allCoords[minIdx][fieldCtx.playIndex][0];
      fieldCtx.duplication[minIdx][0] =
        fieldCtx.allCoords[minIdx][fieldCtx.playIndex][1];
      fieldCtx.setIsMoving(true);
    } else {
      console.log('범위내의 좌표없음');
    }

    if (nowI === -1) {
      // 플레이어, 복제좌표 모두 클릭하지 않았을 때 복제모드 끔
      fieldCtx.setIsMoving(() => false);
      return;
    }
  };

  function brushColorHandler(e) {
    setBrushColor(() => e.target.value);
  }
  function brushSizeHandler(e) {
    setBrushSize(() => e.target.value);
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
    setCtx(() => contextRef.current);
  }, [fieldCtx.isPause]);

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
        fieldCtx.setIsSocket(() => true);
        const coordData = JSON.parse(message.data);
        for (let i = 0; i < 12; i++) {
          if (i in coordData) {
            //user x,y
            const x = parseFloat(coordData[i][0] * canvasWidth);
            const y = parseFloat(coordData[i][1] * canvasHeigth);
            fieldCtx.allCoords[i].push([x, y]);

            //이전 값이 있다면 거리 계산
            if (userXInfo[i] != null && userYInfo[i] != null) {
              disX = Math.abs(x * fixelX - userXInfo[i]);
              disY = Math.abs(y * fixelY - userYInfo[i]);
              nowDistance = Math.sqrt(disX * disX + disY * disY);
              if (((nowDistance / fpsTime) * 360) / 1000 < 44) {
                //속도가 정상 속도면 거리 합 진행
                totalDistance[i] += Math.sqrt(disX * disX + disY * disY);
              }
            }
            userXInfo[i] = x * fixelX;
            userYInfo[i] = y * fixelY;
          } else if (fieldCtx.allCoords[i].length > 0) {
            // 값이 안들어오면 이전 값 넣어줌
            fieldCtx.allCoords[i].push([
              fieldCtx.allCoords[i].at(-1)[0],
              fieldCtx.allCoords[i].at(-1)[1],
            ]);
          } else {
            // 이전 값도 없으면 [0, 0] 넣어줌
            fieldCtx.allCoords[i].push([0, 0]);
          }
        }
        fieldCtx.HandleBuffer();
        fieldCtx.setMaxIndex((prev) => prev + 1);
      };
      ws.onclose = function () {
        ws = undefined;
        fieldCtx.setIsBuffered(true);
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
          value={brushColor}
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
          onTouchEnd={() => {
            finishDrawing();
            fieldCtx.setIsMoving(() => false);
          }}
          onTouchMove={(e) => {
            drawing(e);
            fieldCtx.setDuplicationEvent(() => e);
          }}
          onTouchCancel={() => {
            finishDrawing();
            fieldCtx.setIsMoving(() => false);
          }}
        />
        <DuplicationPlayer />
        <CoordsSet />
        <DuplicationLine />
      </div>
      <TimeRange />
      <PlayInputGroup />
    </div>
  );
}
export default FieldPage;

/* useState...
useState를 써서 index를 1씩 늘리려 해도 변경된 값을 불러올 수 없다.
변경된 값을 불러오는 방법은 useEffect({}, ['#여기']) 안에 받아오고 싶은 변수를 넣으면 되는데
이렇게 하면 canvas에 문제가 생겨서 drawing을 할 수 없게 된다.

====> 그러면 canvas 컴포넌트들을 나눈다면?????????
*/
