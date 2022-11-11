import React, { useEffect, useRef, useState, useContext } from 'react';
import filedContext from '../../context/FieldContext';
import styles from './PlayInputGroup.module.css';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import NotStartedOutlinedIcon from '@mui/icons-material/NotStartedOutlined';

function PlayInputGroup() {
  const fieldCtx = useContext(filedContext);
  useEffect(() => {}, []);
  return (
    <div>
      <div onClick={fieldCtx.HandlePause}>
        {fieldCtx.isPause ? (
          <NotStartedOutlinedIcon fontSize="large" />
        ) : (
          <PauseCircleOutlineOutlinedIcon fontSize="large" />
        )}
      </div>
    </div>
  );
}
export default PlayInputGroup;
