import React, { useState, useEffect, useRef } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import MyMemes from './MyMemes'
import Situations from './Situations'
const socket = new WebSocket('ws://localhost:5000/')

export default function GameField ({ situations, setsituations }) {
    const usernameRef = useRef(null)
    const params = useParams()
    const [myMemes, setMyMemes] = useState([])
    const [gameState, setGameState] = useState([])
    const [modal, setModal] = useState(true)
    const [username, setUsername] = useState('')

    

    useEffect(() => {  
        if (username) {
            setGameState(gameState[username.memes])
            setGameState(prevState => {
                const updatedState = addUser(prevState, username)
                socket.send(JSON.stringify({
                    method: 'New connection',
                    id: params.id,
                    username: username,
                    gamestate: updatedState
                }))
                return updatedState
            })
        }
        socket.onmessage = (event) => {
            console.log('You have a message:', event.data)
        }
    }, [username])

    useEffect(() => { 
        if (Object.keys(gameState).length > 0) { 
            socket.send(JSON.stringify({
                method: 'stateUpdate',
                id: params.id,
                username: username,
                gamestate: gameState,
            }))
            console.log(gameState)
            socket.onmessage = (event) => {
                console.log('You have a message:', event.data)
            }
        }
    }, [gameState])

    console.log(myMemes)
    const addUser = (prevState, userName) => {
        console.log(myMemes)
        return {
            ...prevState,
            [userName]: {
                memes: myMemes,
                points: 0
            }
        }
    }

    const connectHandler = () => {
        setUsername(usernameRef.current.value)
        setModal(false)
    }

    const getPoint = () => {
        if (username) {
            setGameState((prevState) => {
                return {
                    ...prevState,
                    [username]: {
                        ...prevState[username],
                        points: prevState[username].points + 1
                    }
                }
            })
        } 
    }

    return (
        <div className="game">
            <button className='btn btn-primary' onClick={() => getPoint()}>+Point</button>
            
            <Modal centered show={modal} onHide={() => {}} >
                <Modal.Header >
                    <Modal.Title>Пиши ник</Modal.Title>
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

            <Situations situations={situations} setsituations={setsituations} />
            <MyMemes myMemes={myMemes} setMyMemes={setMyMemes} />
        </div>
    )
}