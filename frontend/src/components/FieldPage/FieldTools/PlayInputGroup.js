import React, { useEffect, useRef, useState, useContext } from 'react';
import filedContext from '../../../context/FieldContext';
import styles from './PlayInputGroup.module.css';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function PlayInputGroup() {
  const fieldCtx = useContext(filedContext);
  useEffect(() => {}, []);
  return (
    <div className={styles.play_tools}>
      <div onClick={fieldCtx.HandlePause}>
        {fieldCtx.isPause ? (
          <PlayArrowIcon fontSize="large" />
        ) : (
          <PauseIcon fontSize="large" />
        )}
      </div>
    </div>
  );
}
export default PlayInputGroup;
