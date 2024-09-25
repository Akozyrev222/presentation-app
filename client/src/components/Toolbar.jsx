import React from 'react';
import '../styles/toolbar.scss'
import {FaEraser, FaPaintBrush, FaRedo, FaRegCircle, FaSave, FaUndo} from "react-icons/fa";
import {MdRectangle} from "react-icons/md";
import {IoPencilOutline} from "react-icons/io5";
import toolState from "../store/toolState.js";
import Brush from "../tools/Brush.js";
import canvasState from "../store/canvasState.js";
import Rect from "../tools/Rect.js";

const Toolbar = () => {
    return (
        <div className='toolbar'>
            <button className='toolbar__btn' onClick={() => toolState.setTool(new Brush(canvasState.canvas))}>
                <FaPaintBrush size={25}/>
            </button>
            <button className='toolbar__btn' onClick={() => toolState.setTool(new Rect(canvasState.canvas))}>
                <MdRectangle size={25}/>
            </button>
            <button className='toolbar__btn'>
                <FaRegCircle size={25}/>
            </button>
            <button className='toolbar__btn'>
                <FaEraser size={25}/>
            </button>
            <button className='toolbar__btn '>
                <IoPencilOutline
                    size={25}/>
            </button>
            <input className='toolbar__btn ' type='color'/>
            <button className='toolbar__btn left'>
                <FaUndo
                    size={25}/>
            </button>
            <button className='toolbar__btn '>
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