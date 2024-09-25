import React, {useEffect, useRef} from 'react';
import '../styles/canvas.scss'
import canvasState from "../store/canvasState.js";
import toolState from "../store/toolState.js";
import Brush from "../tools/Brush.js";

const Canvas = () => {
    const canvasRef = useRef()

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
        toolState.setTool(new Brush(canvasRef.current))
    }, []);

    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
    }
    return (
        <div className='canvas'>
            <canvas onMouseDown={mouseDownHandler} ref={canvasRef} width={600} height={400}></canvas>
        </div>
    );
};

export default Canvas;