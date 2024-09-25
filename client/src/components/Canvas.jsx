import React, {useEffect, useRef, useState} from 'react';
import '../styles/canvas.scss'
import canvasState from "../store/canvasState.js";
import toolState from "../store/toolState.js";
import Brush from "../tools/Brush.js";
import {Button, Modal} from "react-bootstrap";
import {useParams} from "react-router-dom";

const Canvas = () => {
    const canvasRef = useRef()
    const usernameRef = useRef()
    const [modal, setModal] = useState(true)
    const params = useParams()

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
        toolState.setTool(new Brush(canvasRef.current))
    }, []);

    useEffect(() => {
        if (canvasState.username) {
            const socket = new WebSocket('ws://localhost:4000/')
            canvasState.setSocket(socket)
            canvasState.setSessionId(params.id)
            socket.onopen = () => {
                console.log('send')
                socket.send(JSON.stringify({
                    id: params.id,
                    username: canvasState.username,
                    method: 'connection'
                }))
            }
            socket.onmessage = (event) => {
                let msg = JSON.parse(event.data)
                switch (msg.method) {
                    case 'connection':
                        console.log(msg)
                        break
                    case 'draw':
                        drawHandler(msg)
                }
            }
        }
    }, [canvasState.username]);

    const drawHandler = (msg) => {

    }

    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
    }
    const connectionHandler = () => {
        canvasState.setUsername(usernameRef.current.value)
        setModal(false)
    }
    return (
        <div className='canvas'>
            <Modal show={modal} onHide={() => {
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter your name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type='text' ref={usernameRef}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => connectionHandler()}>
                        Enter
                    </Button>
                </Modal.Footer>
            </Modal>
            <canvas onMouseDown={mouseDownHandler} ref={canvasRef} width={600} height={400}></canvas>
        </div>
    );
};

export default Canvas;