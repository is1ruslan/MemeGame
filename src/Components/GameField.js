import React, { useState, useEffect, useRef } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
const socket = new WebSocket('ws://localhost:5000/')

export default function GameField () {
    const usernameRef = useRef(null)
    const [gameState, setGameState] = useState()
    const [modal, setModal] = useState(true)
    const params = useParams()
    const [username, setUsername] = useState('')

    useEffect(() => {  
        if (username) {
            console.log(`Hi, ${username}`)
            socket.send(JSON.stringify({
                method: 'connection',
                id: 56,
                username: username
            }))
        }
    }, [username])

    const connectHandler = () => {
        setUsername(usernameRef.current.value)
        setModal(false)
    }

    return (
        <div className="canvas">
            <Modal centered show={modal} onHide={() => {}} >
                <Modal.Header >
                    <Modal.Title>Введите ваш никнейм</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" ref={usernameRef}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={() => connectHandler()}>
                        Войти
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}