import React, { useEffect, useState, useContext } from 'react';
import filedContext from '../../../context/FieldContext';
import styles from './TimeRange.module.css';
import Slider from '@mui/material/Slider';

/////
import { createTheme, ThemeProvider } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#B3DC3C',
    },
    secondary: {
      main: '#739106',
    },
  },
});

theme = createTheme(theme, {
  palette: {
    info: {
      main: theme.palette.secondary.main,
    },
  },
});

/////
function TimeRange() {
  const fieldCtx = useContext(filedContext);
  const [isTouchEnd, setIsTouchEnd] = useState(false);

  const timeRangeHandler = (e) => {
    if (!isTouchEnd) {
      return;
    }
    // fieldCtx.setIsPause(true);
    fieldCtx.setIsTimeChanged(true);
    fieldCtx.setPlayTime(parseInt(e.target.value));
    setIsTouchEnd(false);
  };

  useEffect(() => {}, [fieldCtx.playIndex, fieldCtx.isPause]);
  return (
    <div className={styles.time_range}>
      <div className={styles.slider_box}>
        <ThemeProvider theme={theme}>
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
              color="secondary"
              slotProps={{ thumb: { className: styles.thumb } }}
            />
          ) : (
            <Slider
              min={0}
              max={fieldCtx.maxIndex}
              defaultValue={0}
              value={fieldCtx.playIndex}
              onChange={(e) => timeRangeHandler(e)}
              onTouchEnd={() => setIsTouchEnd(true)}
              step={5}
            />
          )}
        </ThemeProvider>
      </div>
    </div>
  );
}
export default TimeRange;
