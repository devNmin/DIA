import { createContext, useState } from 'react';

export const HeartContext = createContext(
  {heartBeat: {}, setHeartBeat : () => {}}
);

export function HeartContextProvider(props) {
  const [heartBeat, setHeartBeat] = useState([])

  const heartBeatHandler = (roomCnt)=>{
    setHeartBeat(roomCnt)
  }

  const context = {
    heartBeat: heartBeat,
    changeHeartBeat: heartBeatHandler
  }

  return (
    <HeartContext.Provider value={context}>{props.children}</HeartContext.Provider>
  );
};

export default HeartContextProvider;

