import React, { useRef, useEffect, useContext, useState } from 'react';
import * as StompJs from "@stomp/stompjs";
import Qwer from './qwer';
import { HeartContext } from '../../context/HeartContext';

function Heartbeat(props) {
  const $websocket = useRef(null);
  const [startFlag, setStartFlag] = useState(0)

  const heartBeatCtx = useContext(HeartContext)


  let topicList = []


  //todo: 선수 email 목록 추가하기
  const userList = ['15', 'user1', 'user2', 'user3', 'user4', 'user7'];


  const user = () => {
    let inputUser = { userEmail: '', userHeartBeat: 0 };
    for (let i = 0; i < userList.length; i++) {
      inputUser = { i, userEmail: userList[i], userHeartBeat: 0 };
      // console.log(inputUser)
      heartBeatCtx.changeHeartBeat((prev) => { let now = prev; now.push(inputUser); return now }) 
    }
  }



  const connect = () => {
    $websocket.current = new StompJs.Client({
      brokerURL: "ws://k7b307.p.ssafy.io:8081/ws/websocket", // 웹소켓 서버로 직접 접속

      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("socket connected!!!")
        subscribe();
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });

    $websocket.current.activate();
  };

  const disconnect = () => {
    $websocket.current.deactivate();
  };

  const subscribe = () => {
    for (let i of topicList) {
      $websocket.current.subscribe(i, ({ body }) => {
        const dd = JSON.parse(body)
        console.log("받아온 데이터 :", dd)
        console.log("heartBeatCtx ", heartBeatCtx)

        let newkeywords = heartBeatCtx.heartBeat.map(k => {
          if (k.userEmail === dd.userEmail) {
            console.log("일치", k)
            return {
              ...k,
              userHeartBeat: dd.userHeartRate
            };
          }
          else {
            console.log("불일치", k)
            return {
              ...k
            };
          }
        });
        console.log('newkeywords', newkeywords)

        heartBeatCtx.changeHeartBeat(newkeywords)
      });
    }

  };

  useEffect(() => {
    if (startFlag === 0) {
      user();
      setStartFlag(1);
    }

    connect();
    for (let index = 0; index < userList.length; index++) {
      topicList[index] = '/topic/api/' + userList[index];
    }


    console.log('heartBeatCtx.heartBeat in UseEffect', heartBeatCtx.heartBeat)

    const interval = setInterval(() => {
    }, 2000);


    return () => {
      clearInterval(interval);
      disconnect();
      // console.log(heartBeat.userId)
    }
  }, [heartBeatCtx.heartBeat]); //
  //   const topicList = ['/topic/template', '/topic/api/user0', '/topic/api/user2', '/topic/api/user3', '/topic/api/user4', '/topic/api/user1']
  return (
    <>
      <div style={{
        color: 'white', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end',
        position: 'absolute', bottom: 0
      }}>
        {heartBeatCtx.heartBeat.map((heart, index) => (
          <Qwer
            user={heart.userEmail}
            heartB={heart.userHeartBeat}
            key={index}
          />
        ))}
      </div>
    </>
  );
}

export default Heartbeat;
