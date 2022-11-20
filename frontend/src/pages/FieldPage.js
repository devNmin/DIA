//https://velog.io/@mokyoungg/React-React%EC%97%90%EC%84%9C-Canvas-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0%EB%A7%88%EC%9A%B0%EC%8A%A4-%EA%B7%B8%EB%A6%AC%EA%B8%B0
import UserContext from '../context/UserContext';
import fieldContext from '../context/FieldContext';
import React, { useEffect, useRef, useState, useContext } from 'react';
import axios from 'axios';
import styles from './FieldPage.module.css';
import SoccerField from '../components/FieldPage/SoccerField';
import CoordsSet from '../components/FieldPage/CoordsSet';
import DuplicationPlayer from '../components/FieldPage/DuplicationPlayer';
import TimeRange from '../components/FieldPage/FieldTools/TimeRange';
import PlayInputGroup from '../components/FieldPage/FieldTools/PlayInputGroup';
import DuplicationLine from '../components/FieldPage/DuplicationLine';
import DrawingTool from '../components/FieldPage/FieldTools/DrawingTool';
// import BookMark from '../components/FieldPage/FieldTools/BookMark';
import ScoreBoard from '../components/FieldPage/FieldTools/ScoreBoard';
import AuthContext from '../context/AuthContext';
import Heartbeat from '../components/FieldPage/Heartbeat';
import { HeartContext } from '../context/HeartContext';

function FieldPage() {
  const {
    ipV4,
    portinput,
    setSocketStop,
    socketStop,
    ws,
    matchTeam,
    totalDistance,
  } = useContext(UserContext);
  const fieldCtx = useContext(fieldContext);
  const { authTokens, BASE_URL } = useContext(AuthContext);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [nowDate, setNowDate] = useState(null);
  const canvasWidth = window.innerWidth;
  const canvasHeigth = window.innerHeight * 0.8;

  const heartBeatCtx = useContext(HeartContext);

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

    if (fieldCtx.ctx) {
      fieldCtx.setPrevData((prev) => [timestamp, clientX, clientY, prev[3]]);
      if (!isDrawing) {
        fieldCtx.ctx.beginPath();
        fieldCtx.ctx.moveTo(clientX, clientY);
      } else {
        fieldCtx.ctx.lineTo(clientX, clientY);
        fieldCtx.ctx.strokeStyle = fieldCtx.brushColor;
        fieldCtx.ctx.lineWidth = fieldCtx.brushSize;
        if (
          nativeEvent.targetTouches.length > 1 ||
          (nativeEvent.type === 'touchstart' &&
            fieldCtx.prevData[3] === 'touchstart')
        ) {
          return;
        }
        fieldCtx.ctx.stroke();
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

      fieldCtx.setNowD(minIdx);
      fieldCtx.setIsMoving(true);
    }

    if (nowI === -1) {
      // 플레이어, 복제좌표 모두 클릭하지 않았을 때 복제모드 끔
      fieldCtx.setIsMoving(() => false);
      return;
    }
  };

  useEffect(() => {
    if (!fieldCtx.ctx) {
      const canvas = canvasRef.current;
      canvas.width = canvasWidth;
      canvas.height = canvasHeigth;
      const context = canvas.getContext('2d');
      contextRef.current = context;
      fieldCtx.setCtx(() => contextRef.current);
    }
    if (!nowDate) {
      let today = new Date();
      const gameYear = today.getFullYear();
      const gameMonth = today.getMonth() + 1;
      const gameDay = today.getDate();
      const gameTime = today.getHours();
      setNowDate({
        gameYear: gameYear,
        gameMonth: gameMonth,
        gameDay: gameDay,
        gameTime: gameTime,
      });
    }
    // socketStart();
  }, [fieldCtx.isPause]);

  // 소켓

  // let ws = undefined;

  // let disX = 0;
  // let disY = 0; //x,y의 거리 값
  // let fixelX = 40 / 1180; // 실제 거리 변환을 위한 값 -> 미터 단위
  // let fixelY = 20 / 656;
  // let nowDistance = 0;
  // let totalDistance = Array.from({ length: 6 }, () => 0);
  // let fpsTime = 0.04; //프레임 컴퓨터에서 계산하는 속도? 5ms -> 나중엔 받아서 변경
  // let userXInfo = Array.from({ length: 6 }, () => 0);
  // let userYInfo = Array.from({ length: 6 }, () => 0); //이전 유저의 x,y 좌표값
  // let index = -1;
  // const socketStart = () => {
  //   console.log('connecting....');
  //   if (ws === undefined) {
  //     ws = new WebSocket('ws://' + host + ':' + port + '/ws');
  //     ws.onopen = () => {
  //       console.log('connected!!');
  //     };
  //     ws.onmessage = (message) => {
  //       fieldCtx.setIsSocket(() => true);
  //       const coordData = JSON.parse(message.data);

  //       index++;
  //       for (let i = 0; i < 12; i++) {
  //         if (i in coordData) {
  //           //user x,y
  //           const x = (coordData[i][0] * canvasWidth).toFixed(3);
  //           const y = (coordData[i][1] * canvasHeigth).toFixed(3);
  //           if (fieldCtx.allCoords[i].length === 0) {
  //             fieldCtx.allCoords[i].push([x, y]);
  //             continue;
  //           }
  //           //이전 값이 있다면 거리 계산
  //           if (userXInfo[i] != null && userYInfo[i] != null) {
  //             disX = Math.abs(x * fixelX - userXInfo[i]);
  //             disY = Math.abs(y * fixelY - userYInfo[i]);
  //             nowDistance = Math.sqrt(disX * disX + disY * disY);
  //             if (((nowDistance / fpsTime) * 3600) / 1000 < 44) {
  //               //속도가 정상 속도면 거리 합 진행
  //               fieldCtx.allCoords[i].push([x, y]);
  //               totalDistance[i] += Math.sqrt(disX * disX + disY * disY);
  //             } else {
  //               fieldCtx.allCoords[i].push([
  //                 fieldCtx.allCoords[i].at(-1)[0],
  //                 fieldCtx.allCoords[i].at(-1)[1],
  //               ]);
  //             }
  //           } else {
  //             fieldCtx.allCoords[i].push([x, y]);
  //           }
  //           userXInfo[i] = x * fixelX;
  //           userYInfo[i] = y * fixelY;
  //         } else if (fieldCtx.allCoords[i].length > 0) {
  //           // 값이 안들어오면 이전 값 넣어줌
  //           fieldCtx.allCoords[i].push([
  //             fieldCtx.allCoords[i].at(-1)[0],
  //             fieldCtx.allCoords[i].at(-1)[1],
  //           ]);
  //         } else {
  //           // 이전 값도 없으면 [0, 0] 넣어줌
  //           fieldCtx.allCoords[i].push([0.001, 0.001]);
  //         }
  //       }
  //       fieldCtx.HandleBuffer();
  //       fieldCtx.setMaxIndex((prev) => prev + 1);
  //     };
  //     ws.onclose = function () {
  //       ws = undefined;
  //       fieldCtx.setIsBuffered(true);
  //       console.log('Server Disconnect..');
  //       const data = {
  //         gameYear: nowDate.gameYear,
  //         gameMonth: nowDate.gameMonth,
  //         gameDay: nowDate.gameDay,
  //         gameTime: nowDate.gameTime,
  //         userData: [
  //           {
  //             userID: '10',
  //             userDistance: `${totalDistance[0]}`,
  //           },
  //         ],
  //         gameXY: fieldCtx.allCoords,
  //         gameScore: `${fieldCtx.score1}:${fieldCtx.score2}`,
  //       };
  //       console.log(data);
  //       axios({
  //         method: 'post',
  //         url: BASE_URL + 'game/newGame/',
  //         headers: `Bearer ${authTokens}`,
  //         data: data,
  //       })
  //         .then((response) => console.log(response))
  //         .catch((err) => console.log(err));
  //     };
  //     ws.onerror = function (message) {
  //       console.log('error..');
  //     };
  //   }
  // };
  // let ws = new WebSocket('ws://' + ipV4 + ':' + portinput + '/ws')
  const socketStop2 = async () => {
    // ws.close()
    // console.log(socketStop);
    // console.log(ws);
    ws.close();
    console.log('소켓끝!');
    fieldCtx.setIsSocket(() => false);
    let userData = [];
    for (let index = 0; index < matchTeam.length; index++) {
      console.log(matchTeam);
      console.log('matchTeam 인덱스' + matchTeam[index]);
      // console.log('socket종료시' + JSON.stringify(heartBeatCtx.heartBeat[index].userHeartBeat));
      const element = {
        userID: `${parseInt(matchTeam[index].userId)}`,
        userDistance: `${totalDistance[index]}`,
        userHeartRate: parseInt(
          JSON.stringify(heartBeatCtx.heartBeat[index].userHeartBeat)
        ),
      };
      userData.push(element);
      // await setUserData((userData) => {
      //   console.log(userData);
      //   return [...userData, element]
      // })
    }
    let coordDict = {};
    for (let index = 0; index < 6; index++) {
      const element = fieldCtx.allCoords[index];
      const userPk = matchTeam[index].userId;
      coordDict[`${userPk}`] = element;
    }
    const data = {
      gameYear: nowDate.gameYear,
      gameMonth: nowDate.gameMonth,
      gameDay: nowDate.gameDay,
      gameTime: nowDate.gameTime,
      userData: userData,
      gameXY: coordDict,
      gameScore: `${fieldCtx.score1}:${fieldCtx.score2}`,
    };
    console.log(data);
    // console.log(authTokens.accessToken);
    axios({
      method: 'post',
      url: BASE_URL + 'game/newGame/',
      headers: {
        Authorization: `Bearer ${authTokens.accessToken}`,
      },
      data: data,
    })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  // const socketSend = () => {
  //   if (ws !== undefined) {
  //     ws.send('hello this is client Message'); //client to server
  //   }
  // };

  return (
    <div className={styles.size}>
      <ScoreBoard />
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

      <div className={styles.field_tools}>
        <PlayInputGroup />
        <DrawingTool />
        {/* <BookMark /> */}
      </div>
      <Heartbeat />
      <div className={styles.socketGroup}>
        <button
          className={`${styles.custom_btn} ${styles.game_close}`}
          onClick={socketStop2}
        >
          경기 종료
        </button>
      </div>
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
