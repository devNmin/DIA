import styles from './CoordsSet.module.css';
import React, { useEffect, useRef, useState, useContext } from 'react';

function CoordsSet() {
  const canvasRef2 = useRef(null);
  const canvasRef3 = useRef(null);

  const [ctx3, setCtx3] = useState();
  return (
    <div className={styles.canvas_box}>
      <canvas className={styles.canvas3} ref={canvasRef3} />
      <canvas className={styles.canvas2} ref={canvasRef2} />
    </div>
  );
}
export default CoordsSet;
