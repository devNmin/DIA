import React, { useRef, useContext, useState, useEffect } from 'react';
import './IpInsertPage.css';
import InputMask from 'react-input-mask';
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';
import FootballNavbar from '../components/Navbar/FootballNavbar';
import LodingText from '../components/Common/LodingText';
import FieldContext from '../context/FieldContext';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { HeartContext } from '../context/HeartContext';

export default function IpInsertPage() {
  const {
    setIpV4,
    setPort,
    ipV4,
    portinput,
    setFirstCoord,
    // userData,
    // setUserData,
    setWs,
    matchTeam,
    setTotalDistance,
  } = useContext(UserContext);
  const fieldCtx = useContext(FieldContext);
  // const { authTokens, BASE_URL } = useContext(AuthContext);
  // const heartBeatCtx = useContext(HeartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [nowDate, setNowDate] = useState(null); 
  const history = useHistory();
  const ipAddress = useRef();
  const port = useRef();
  let ws = undefined;
  const canvasWidth = window.innerWidth;
  const canvasHeigth = window.innerHeight * 0.8;
  let userXInfo = Array.from({ length: 6 }, () => 0);
  let userYInfo = Array.from({ length: 6 }, () => 0); //이전 유저의 x,y 좌표값
  let fixelX = 40 / 1180; // 실제 거리 변환을 위한 값 -> 미터 단위
  let fixelY = 20 / 656;
  let disX = 0;
  let disY = 0;
  let nowDistance = 0;
  let totalDistance = Array.from({ length: 6 }, () => 0);
  let fpsTime = 0.04; //프레임 컴퓨터에서 계산하는 속도? 5ms -> 나중엔 받아서 변경
  let index = -1;
 

  useEffect(() => {
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
  }, [fieldCtx.isPause]);

  const ipChecker = async () => {
    // await setIpV4(ipAddress.current.value.replace(/ /g, ''))
    // // console.log(portsubmit);
    // await setPort(port.current.value)    
    if (ipV4) {
      if (portinput) {
        console.log('ipV4' + ipV4);
        console.log('portinput' + portinput);
        setIsLoading(true);
        console.log('connecting....');
        if (ws === undefined) {
          ws = new WebSocket('ws://' + ipV4 + ':' + portinput + '/ws');
          setWs(ws);
          let flag = true;
          ws.onopen = () => {
            console.log('connected!!');
            ws.onmessage = async (message) => {
              // console.log(socketStop);
              fieldCtx.setIsSocket(() => true);
              const coordData = JSON.parse(message.data);
              // console.log(message);
              if (flag) {
                flag = false;
                console.log('hi');
                setFirstCoord(JSON.parse(message.data));
                history.push('/teamregister');
              }
              index++;
              for (let i = 0; i < 12; i++) {
                if (i in coordData) {
                  //user x,y
                  const x = (coordData[i][0] * canvasWidth).toFixed(3);
                  const y = (coordData[i][1] * canvasHeigth).toFixed(3);
                  if (fieldCtx.allCoords[i].length === 0) {
                    fieldCtx.allCoords[i].push([x, y]);
                    continue;
                  }
                  //이전 값이 있다면 거리 계산
                  if (userXInfo[i] != null && userYInfo[i] != null) {
                    disX = Math.abs(x * fixelX - userXInfo[i]);
                    disY = Math.abs(y * fixelY - userYInfo[i]);
                    nowDistance = Math.sqrt(disX * disX + disY * disY);
                    if (((nowDistance / fpsTime) * 3600) / 1000 < 44) {
                      //속도가 정상 속도면 거리 합 진행
                      fieldCtx.allCoords[i].push([x, y]);
                      totalDistance[i] += Math.sqrt(disX * disX + disY * disY);
                    } else {
                      fieldCtx.allCoords[i].push([
                        fieldCtx.allCoords[i].at(-1)[0],
                        fieldCtx.allCoords[i].at(-1)[1],
                      ]);
                    }
                  } else {
                    fieldCtx.allCoords[i].push([x, y]);
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
                  fieldCtx.allCoords[i].push([0.001, 0.001]);
                }
              }
              setTotalDistance(totalDistance)


              fieldCtx.HandleBuffer();
              fieldCtx.setMaxIndex((prev) => prev + 1);
            };
          };

          ws.onclose = async () => {
            // console.log('두근두근 내심장' + heartBeatCtx.heartBeat);
            // const [userDataTest, setUserDataTest] = useState([])
            // let userDatatest =  []
            // for (let index = 0; index < 6; index++) {
            //   console.log(matchTeam);
            //   console.log('matchTeam 인덱스'+ matchTeam[index]);
            //   // console.log('socket종료시' + JSON.stringify(heartBeatCtx.heartBeat[index].userHeartBeat));
            //   const element = { userID : `${parseInt(matchTeam[index].userId)}` , userDistance: `${totalDistance[index]}`, userHeartRate : `${parseInt(JSON.stringify(heartBeatCtx.heartBeat[index].userHeartBeat))}`}
            //   console.log('element' + JSON.stringify(element));              
            //   // await setUserData((userData) => {
            //   //   console.log(userData);
            //   //   return [...userData, element]
            //   // })                         
            // }
            ws = undefined;
            fieldCtx.setIsBuffered(true);
            console.log('Server Disconnect..');
            // console.log('userData' + userDatatest);
            // const data = {
            //   gameYear: nowDate.gameYear,
            //   gameMonth: nowDate.gameMonth,
            //   gameDay: nowDate.gameDay,
            //   gameTime: nowDate.gameTime,
            //   userData: userDatatest,
            //   gameXY: fieldCtx.allCoords,
            //   gameScore: `${fieldCtx.score1}:${fieldCtx.score2}`,
            // };
            // console.log(data);
            // // console.log(authTokens.accessToken);
            // axios({
            //   method: 'post',
            //   url: BASE_URL + 'game/newGame/',
            //   headers:  {
            //     Authorization : `Bearer ${authTokens.accessToken}`
            // },
            //   data: data,
            // })
          //   axios
          //   .post(`http://k7b307.p.ssafy.io/api/v1/game/newGame/`,
          //    {
          //     data: data
          //    },
          //   {
          //     headers : {
          //         Authorization : `Bearer ${authTokens.accessToken}`
          //     }
          // })
          // .then((response) => console.log(response))
          // .catch((err) => console.log(err));
          };
          ws.onerror = () => {
            console.log('error..');
            setIsLoading(false);
            setIsError(true);
          };
        }
        // history.push('/teamregister')
      } else {
        alert('port번호를 입력해주세요');
        return;
      }
    } else {
      alert('노트북 IP를 입력해주세요');
      return;
    }
  };

  return (
    <div>
      <FootballNavbar currentpage="ipinsert"></FootballNavbar>
      <div className="ipInsertCon">
        {isLoading ? (
          <LodingText></LodingText>
        ) : (
          <div>
            <h1 className="ipInsertTitle">노트북 ip와 포트를 입력해주세요</h1>
            <div>
              <div>
                <label className="ipfont"> IP : </label>
                <InputMask
                  className="ipInput"
                  mask="999.999.9.99"
                  maskChar=" "
                  placeholder="xxx.xxx.x.xx"
                  ref={ipAddress}
                  onChange={() => {
                    setIpV4(ipAddress.current.value.replace(/ /g, ''));
                  }}
                />
              </div>
              <div>
                <label className="ipfont"> PORT : </label>
                <InputMask
                  className="Port"
                  mask="9999"
                  maskChar=" "
                  placeholder="xxxx"
                  ref={port}
                  onChange={() => {
                    setPort(port.current.value);
                  }}
                />
              </div>
            </div>
            <button className="ipButton" onClick={ipChecker}>
              완료
            </button>
            {isError ? (
              <div className="errorMessage">
                CONNECTION ERROR!! CHECK IP and PORT
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
