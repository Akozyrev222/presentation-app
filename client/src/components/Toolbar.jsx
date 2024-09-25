import React from 'react';
import '../styles/toolbar.scss'
import {FaEraser, FaPaintBrush, FaRedo, FaRegCircle, FaSave, FaUndo} from "react-icons/fa";
import {MdRectangle} from "react-icons/md";
import {IoPencilOutline} from "react-icons/io5";
import toolState from "../store/toolState.js";
import Brush from "../tools/Brush.js";
import canvasState from "../store/canvasState.js";
import Rect from "../tools/Rect.js";
import Circle from "../tools/Circle.js";
import Eraser from "../tools/Eraser.js";
import Line from "../tools/Line.js";

const Toolbar = () => {

    const changeColor = (e) => {
        toolState.setFillColor(e.target.value)
        toolState.setStrokeColor(e.target.value)
    }

    return (
        <div className='toolbar'>
            <button className='toolbar__btn'
                    onClick={() => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionid))}>
                <FaPaintBrush size={25}/>
            </button>
            <button className='toolbar__btn'
                    onClick={() => toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionid))}>
                <MdRectangle size={25}/>
            </button>
            <button className='toolbar__btn'
                    onClick={() => toolState.setTool(new Circle(canvasState.canvas))}>
                <FaRegCircle size={25}/>
            </button>
            <button className='toolbar__btn' onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}>
                <FaEraser size={25}/>
            </button>
            <button className='toolbar__btn' onClick={() => toolState.setTool(new Line(canvasState.canvas))}>
                <IoPencilOutline
                    size={25}/>
            </button>
            <input
                className='toolbar__btn '
                type='color'
                onChange={changeColor}
            />
            <button className='toolbar__btn left' onClick={() => canvasState.undo()}>
                <FaUndo
                    size={25}/>
            </button>
            <button className='toolbar__btn' onClick={() => canvasState.redo()}>
                <FaRedo
                    size={25}/>
            </button>
            <button className='toolbar__btn right'>
                <FaSave
                    size={25}/>
            </button>
        </div>
    );
};

export default Toolbar;