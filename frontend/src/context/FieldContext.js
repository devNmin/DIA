import { createContext, useState } from 'react';

const FieldContext = createContext({
  //// 그리기
  prevData: [],
  setPrevData: () => {},
  ctx: null,
  setCtx: () => {},
  brushColor: 0,
  setBrushColor: () => {},
  brushSize: 0,
  setBrushSize: () => {},
  //// 재생
  isSocket: false,
  setIsSocket: () => {},
  playIndex: 0,
  setPlayIndex: () => {},
  coord: [],
  setCoord: () => {},
  allCoords: {},
  setAllCoords: () => {},
  accumulate: 0,
  setAccumulate: () => {},
  isBuffered: false,
  setIsBuffered: () => {},
  HandleBuffer: () => {},
  maxIndex: 0,
  setMaxIndex: () => {},
  isPause: false,
  setIsPause: () => {},
  HandlePause: () => {},
  playTime: 0,
  setPlayTime: () => {},
  isTimeChanged: 0,
  setIsTimeChanged: () => {},

  duplication: {},
  setDuplication: () => {},
  dupleLineCoords: {},
  setDupleLineCoords: () => {},
  duplicationEvent: {},
  setDuplicationEvent: () => {},
  isMoving: false,
  setIsMoving: () => {},
  nowD: 0,
  setNowD: () => {},
  lastX: null,
  setLastX: () => {},
  lastY: null,
  setLastY: () => {},
  ctxEvenet: null,
  setCtxEvent: () => {},
  duplicationReset: () => {},

  score1: 0,
  setScore1: () => {},
  score2: 0,
  setScore2: () => {},
});

export default FieldContext;

export const FieldProvider = ({ children }) => {
  //// 그리기 관련
  const [prevData, setPrevData] = useState([0, 0, 0, '']);
  const [ctx, setCtx] = useState(null);
  const [brushColor, setBrushColor] = useState('#F5DF4D');
  const [brushSize, setBrushSize] = useState('1');
  //// 재생 관련
  const [isSocket, setIsSocket] = useState(false);
  const [playIndex, setPlayIndex] = useState(0); // 현재 그려주는 시점 인덱스
  const [coord, setCoord] = useState(null);
  const [allCoords, setAllCoords] = useState({
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
  });
  const [accumulate, setAccumulate] = useState(0); // 현재 재생하지 않고 있는 데이터 수
  const [isBuffered, setIsBuffered] = useState(false); // 버퍼링중인가?
  const HandleBuffer = () => {
    setAccumulate((prev) => {
      if (prev + 1 > 60) {
        setIsBuffered(true);
      }
      return prev + 1;
    });
  };
  const [maxIndex, setMaxIndex] = useState(0); // 들어온 데이터 수
  const [isPause, setIsPause] = useState(false); // 일시정지 상태인가?
  const HandlePause = () => {
    // 일시정지 버튼 누를 때 재생 상태가 바뀌고 복제점 사라짐

    duplicationReset();
    setIsPause((prev) => {
      return !prev;
    });
  };
  const [playTime, setPlayTime] = useState(0); // 재생 바 움직일 때 value
  const [isTimeChanged, setIsTimeChanged] = useState(false);

  //// 점 복제 관련
  const [duplication, setDuplication] = useState({
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
  });
  const [dupleLineCoords, setDupleLineCoords] = useState({
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
  });
  const [duplicationEvent, setDuplicationEvent] = useState(null); // 터치 이벤트
  const [isMoving, setIsMoving] = useState(false); // 점을 옮기는 중인지
  const [nowD, setNowD] = useState(-1); // 옮기고 있는 점의 플레이어 번호
  const [lastX, setLastX] = useState(null);
  const [lastY, setLastY] = useState(null);
  const [ctxEvenet, setCtxEvent] = useState(null);
  const duplicationReset = () => {
    setDuplicationEvent(null);
    setCtxEvent(null);
    setDuplication({
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: [],
    });
    setDupleLineCoords({
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: [],
    });
  };
  ////기타
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  /////////////////////////
  let contextData = {
    prevData: prevData,
    setPrevData: setPrevData,
    ctx: ctx,
    setCtx: setCtx,
    brushColor: brushColor,
    setBrushColor: setBrushColor,
    brushSize: brushSize,
    setBrushSize: setBrushSize,
    //
    isSocket: isSocket,
    setIsSocket: setIsSocket,
    playIndex: playIndex,
    setPlayIndex: setPlayIndex,
    coord: coord,
    setCoord: setCoord,
    allCoords: allCoords,
    setAllCoords: setAllCoords,
    accumulate: accumulate,
    setAccumulate: setAccumulate,
    isBuffered: isBuffered,
    setIsBuffered: setIsBuffered,
    HandleBuffer: HandleBuffer,
    maxIndex: maxIndex,
    setMaxIndex: setMaxIndex,
    isPause: isPause,
    HandlePause: HandlePause,
    setIsPause: setIsPause,
    playTime: playTime,
    setPlayTime: setPlayTime,
    isTimeChanged: isTimeChanged,
    setIsTimeChanged: setIsTimeChanged,

    duplication: duplication,
    setDuplication: setDuplication,
    dupleLineCoords: dupleLineCoords,
    setDupleLineCoords: setDupleLineCoords,
    duplicationEvent: duplicationEvent,
    setDuplicationEvent: setDuplicationEvent,
    isMoving: isMoving,
    setIsMoving: setIsMoving,
    nowD: nowD,
    setNowD: setNowD,
    lastX: lastX,
    setLastX: setLastX,
    lastY: lastY,
    setLastY: setLastY,
    ctxEvenet: ctxEvenet,
    setCtxEvent: setCtxEvent,
    duplicationReset: duplicationReset,

    score1: score1,
    setScore1: setScore1,
    score2: score2,
    setScore2: setScore2,
  };
  return (
    <FieldContext.Provider value={contextData}>
      {children}
    </FieldContext.Provider>
  );
};
