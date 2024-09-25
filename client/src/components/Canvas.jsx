import React, {useEffect, useRef, useState} from 'react';
import '../styles/canvas.scss'
import canvasState from "../store/canvasState.js";
import toolState from "../store/toolState.js";
import Brush from "../tools/Brush.js";
import {Button, Modal} from "react-bootstrap";
import {useParams} from "react-router-dom";
import Rect from "../tools/Rect.js";

const Canvas = () => {
    const canvasRef = useRef()
    const usernameRef = useRef()
    const [modal, setModal] = useState(true)
    const params = useParams()

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
    }, []);

    useEffect(() => {
        if (canvasState.username) {
            const socket = new WebSocket('wss://presentation-app-server.onrender.com')
            canvasState.setSocket(socket)
            canvasState.setSessionId(params.id)
            toolState.setTool(new Brush(canvasRef.current, socket, params.id))
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
        const figure = msg.figure
        const ctx = canvasRef.current.getContext('2d')
        switch (figure.type) {
            case "brush":
                Brush.draw(ctx, figure.x, figure.y)
                break
            case "rect":
                Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height)
                break
            case "finish":
                ctx.beginPath()
                break
        }
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