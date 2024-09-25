import React from 'react';
import '../styles/toolbar.scss'
import {FaEraser, FaPaintBrush, FaRedo, FaRegCircle, FaSave, FaUndo} from "react-icons/fa";
import {MdOutlineRectangle, MdRectangle} from "react-icons/md";
import {IoPencilOutline} from "react-icons/io5";

const Toolbar = () => {
    return (
        <div className='toolbar'>
            <button className='toolbar__btn'>
                <FaPaintBrush size={25}/>
            </button>
            <button className='toolbar__btn'>
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