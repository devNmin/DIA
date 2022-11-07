import { createContext, useState } from 'react';

const FieldContext = createContext({
  isSocket: false,
  setIsSocket: () => {},
  playIndex: 0,
  setPlayIndex: () => {},
  coord: [],
  setCoord: () => {},
  coords: {},
  setCoords: () => {},
  prevData: [],
  setPrevData: () => {},
  nowD: 0,
  setNowD: () => {},
  maxIndex: 0,
  setMaxIndex: () => {},
  isPause: false,
  isMoving: false,
  startMoving: () => {},
  finishMoving: () => {},
  HandlePause: () => {},
  duplication: {},
  setDuplication: () => {},
  duplicationEvent: {},
  setDuplicationEvent: () => {},
  playI: 0,
  setPlayI: () => {},
  HandleplayI: () => {},
});

export default FieldContext;

export const FieldProvider = ({ children }) => {
  const [isSocket, setIsSocket] = useState(false);
  const [playIndex, setPlayIndex] = useState(0);
  const [coord, setCoord] = useState(null);
  const [coords, setCoords] = useState({
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  });
  const [prevData, setPrevData] = useState([0, 0, 0, '']);
  const [duplication, setDuplication] = useState({
    0: [-1, -1],
    1: [-1, -1],
    2: [-1, -1],
    3: [-1, -1],
    4: [-1, -1],
    5: [-1, -1],
  });
  const [nowD, setNowD] = useState(-1);
  const [maxIndex, setMaxIndex] = useState(-1);
  const [isPause, setIsPause] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [duplicationEvent, setDuplicationEvent] = useState(null);
  const [playI, setPlayI] = useState(-1);
  const HandleplayI = (II) => {
    setPlayI(II);
  };

  const startMoving = () => {
    setIsMoving(true);
  };
  const finishMoving = () => {
    setIsMoving(false);
  };
  const HandlePause = () => {
    setDuplication({
      0: [-1, -1],
      1: [-1, -1],
      2: [-1, -1],
      3: [-1, -1],
      4: [-1, -1],
      5: [-1, -1],
    });
    setIsPause((prev) => {
      return !prev;
    });
  };

  ///
  let contextData = {
    isSocket: isSocket,
    setIsSocket: setIsSocket,
    playIndex: playIndex,
    setPlayIndex: setPlayIndex,
    coord: coord,
    setCoord: setCoord,
    coords: coords,
    setCoords: setCoords,
    prevData: prevData,
    setPrevData: setPrevData,
    nowD: nowD,
    setNowD: setNowD,
    maxIndex: maxIndex,
    setMaxIndex: setMaxIndex,
    isPause: isPause,
    isMoving: isMoving,
    startMoving: startMoving,
    finishMoving: finishMoving,
    HandlePause: HandlePause,
    duplication: duplication,
    setDuplication: setDuplication,
    duplicationEvent: duplicationEvent,
    setDuplicationEvent: setDuplicationEvent,
    playI: playI,
    setPlayI: setPlayI,
    HandleplayI: HandleplayI,
  };
  return (
    <FieldContext.Provider value={contextData}>
      {children}
    </FieldContext.Provider>
  );
};
