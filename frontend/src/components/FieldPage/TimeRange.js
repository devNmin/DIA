import React, { useEffect, useRef, useState, useContext } from 'react';
import filedContext from '../../context/FieldContext';
import styles from './TimeRange.module.css';

function TimeRange() {
  const fieldCtx = useContext(filedContext);
  const [isTouchEnd, setIsTouchEnd] = useState(false);
  // const [rangeMax, setRangeMax] = useState(0);

  const timeRangeHandler = (e) => {
    if (!isTouchEnd) {
      return;
    }
    console.log(fieldCtx.maxIndex, e.target.value);
    // await fieldCtx.HandlePause();
    // fieldCtx.setIsPause(true);
    fieldCtx.setIsTimeChanged(true);
    fieldCtx.setPlayTime(parseInt(e.target.value));
    setIsTouchEnd(false);
  };

  useEffect(() => {
    // setTimeout(setRangeMax(fieldCtx.maxIndex), 500);
  }, [fieldCtx.playIndex]);
  return (
    <input
      type="range"
      id="timeRange"
      name="timeRange"
      className={styles.time_range}
      min="0"
      max={fieldCtx.maxIndex}
      value={fieldCtx.playIndex}
      onChange={(e) => timeRangeHandler(e)}
      onTouchEnd={() => setIsTouchEnd(true)}
      step="5"
    />
  );
}
export default TimeRange;
