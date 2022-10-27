import React, {useRef, useState, useEffect} from 'react'
import styles from './CanvasTestPage.module.css'


export default function CanvasTestPage() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [ctx, setCtx] = useState();
  const[isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.5;
    canvas.height = window.innerHeight;

    const context = canvas.getContext('2d');
    context.strokeStyle = 'black';
    context.lineWidth = 2.5;
    contextRef.current =context;

    setCtx(context);
  }, []);

  const startDrawing = () => {
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    setIsDrawing(false);
  }

  const drawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    if(ctx) {
      if(!isDrawing){
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      }
      else {
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    }
  }

   
  return (
    <div>
      <section>
        <canvas 
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={drawing}
          onMouseLeave={finishDrawing}
          
          onTouchStart={startDrawing}
          onTouchEnd={finishDrawing}
          onTouchMove={drawing}>

        </canvas>
      </section>
    </div>
  )
}
