import React, { useEffect, useState, useContext } from 'react';
import filedContext from '../../../context/FieldContext';
import styles from './TimeRange.module.css';
import Slider from '@mui/material/Slider';

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
  }, [fieldCtx.playIndex, fieldCtx.isPause]);
  return (
    <div className={styles.time_range}>
      <div className={styles.slider_box}>
        {fieldCtx.isPause ? (
          <Slider
            className={styles.slider}
            min={0}
            max={fieldCtx.maxIndex}
            defaultValue={0}
            value={fieldCtx.playIndex}
            onChange={(e) => timeRangeHandler(e)}
            onTouchEnd={() => setIsTouchEnd(true)}
            step={5}
            slotProps={{ thumb: { className: styles.thumb } }}
          />
        ) : (
          <Slider
            className={styles.playing_slider}
            min={0}
            max={fieldCtx.maxIndex}
            defaultValue={0}
            value={fieldCtx.playIndex}
            onChange={(e) => timeRangeHandler(e)}
            onTouchEnd={() => setIsTouchEnd(true)}
            step={5}
          />
        )}
      </div>
    </div>
  );
}
export default TimeRange;
