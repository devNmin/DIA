import React, { useRef, useEffect, useContext, useState } from 'react';
import * as StompJs from '@stomp/stompjs';
import HeartbeatView from './HeartbeatView';
import { HeartContext } from '../../context/HeartContext';
import UserContext from '../../context/UserContext';
import styles from './Heartbeat.module.css';

function Heartbeat(props) {
  const $websocket = useRef(null);
  const [startFlag, setStartFlag] = useState(0);

  const { matchTeam, matchTeamNum } = useContext(UserContext);
  console.log('matchTeam', matchTeam);
  const heartBeatCtx = useContext(HeartContext);
  // user들의 심박수를 계속 더하는 useState, 
  // 13번까지 있으며, 0번째는 사용하지 않는 인덱스
  const [userHeartSum, setUserHeartSum] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

  let topicList = [];

  //todo: 선수 email 목록 추가하기
  const userList = [];

  for (let i of matchTeam) {
    userList.push(i.userEmail);
  }

  const user = () => {
    let inputUser = { userEmail: '', userHeartBeat: 0 };
    for (let i = 0; i < userList.length; i++) {
      inputUser = {
        i,
        userEmail: userList[i],
        userName: matchTeam[i].userName,
        userHeartBeat: 0,
      };
      // console.log(inputUser)
      heartBeatCtx.changeHeartBeat((prev) => {
        let now = prev;
        now.push(inputUser);
        return now;
      });
    }
  };

  const connect = () => {
    $websocket.current = new StompJs.Client({
      brokerURL: 'ws://k7b307.p.ssafy.io:8081/ws/websocket', // 웹소켓 서버로 직접 접속

      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('socket connected!!!');
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
    let heart = userHeartSum
    for (let i of topicList) {
      $websocket.current.subscribe(i, ({ body }) => {
        const dd = JSON.parse(body);
        console.log('받아온 데이터 :', dd);
        console.log('heartBeatCtx ', heartBeatCtx);
        let newkeywords = heartBeatCtx.heartBeat.map((k) => {
          if (k.userEmail === dd.userEmail) {
            console.log('일치', k);
            return {
              ...k,
              userHeartBeat: dd.userHeartRate,
            };
          } else {
            console.log('불일치', k);
            return {
              ...k,
            };
          }
        });
        // 심박수 계속 더하는 로직
        heart[topicList.indexOf(i) + 1] += dd.userHeartRate
        heart[(topicList.indexOf(i) + 1) * 2] ++
        console.log('newkeywords', newkeywords);

        heartBeatCtx.changeHeartBeat(newkeywords);
      });
    }
    setUserHeartSum(heart)
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

    console.log('heartBeatCtx.heartBeat in UseEffect', heartBeatCtx.heartBeat);

    const interval = setInterval(() => {}, 2000);

    return () => {
      clearInterval(interval);
      disconnect();
      // console.log(heartBeat.userId)
    };
  }, [heartBeatCtx.heartBeat, userHeartSum]); //
  //   const topicList = ['/topic/template', '/topic/api/user0', '/topic/api/user2', '/topic/api/user3', '/topic/api/user4', '/topic/api/user1']

  console.log('!!!!', heartBeatCtx.heartBeat);
  return (
    <>
      <div className={styles.heart_container}>
        {heartBeatCtx.heartBeat.map((heart, index) => (
          <div className={styles.user_heart}>
            <HeartbeatView
              user={heart.userName}
              heartB={heart.userHeartBeat}
              key={index}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Heartbeat;
