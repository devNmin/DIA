import React, { useEffect, useRef, useState, useContext } from 'react';
import filedContext from '../../../context/FieldContext';
import styles from './DrawingTool.module.css';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

function DrawingTool() {
  const fieldCtx = useContext(filedContext);
  function brushColorHandler(e) {
    fieldCtx.setBrushColor(() => e.target.value);
  }
  function brushSizeHandler(e) {
    fieldCtx.setBrushSize(() => e.target.value);
  }
  function canvasClear() {
    fieldCtx.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
  useEffect(() => {}, []);
  return (
    <section className={styles.toolbox}>
      <div className={styles.wrapper}>
        <div className={styles.wrapper}>
          <PaletteOutlinedIcon fontSize="large" className={styles.color_icon} />
        </div>
        <input
          className={styles.color_input}
          type="color"
          id="brushColor"
          value={fieldCtx.brushColor}
          onChange={(e) => {
            brushColorHandler(e);
          }}
        />
      </div>

      <div className={styles.sizebox}>
        <HorizontalRuleRoundedIcon
          fontSize="large"
          className={styles.size_icon}
        />
        <input
          className={styles.size_input}
          type="range"
          min="1"
          max="21"
          step="4"
          value={fieldCtx.brushSize}
          id="brushSize"
          onChange={(e) => {
            brushSizeHandler(e);
          }}
        />
      </div>
      <DeleteOutlineOutlinedIcon
        fontSize="large"
        className={styles.bin_icon}
        onClick={canvasClear}
      />
    </section>
  );
}
export default DrawingTool;
