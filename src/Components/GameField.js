import React, { useState, useEffect, useRef } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import MyMemes from './MyMemes'
import Players from './Players'
import Rules from './Rules'
import config from './config'

export default function GameField () {
    const usernameRef = useRef(null)
    const params = useParams()
    const [socket, setSocket] = useState(null)
    const [myMemes, setMyMemes] = useState([])
    const [gameState, setGameState] = useState({})
    const [modal, setModal] = useState(true)
    const [username, setUsername] = useState('')
    const [winner, setWinner] = useState(false)


    // Update game state for all players
    useEffect(() => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            if (Object.keys(gameState).length > 0 && username) { 
                socket.send(JSON.stringify({
                    method: 'stateUpdate',
                    id: params.id,
                    username: username,
                    gamestate: gameState,
            }))
        }}
    }, [winner, gameState, username, params.id, socket])


    useEffect(() => {
        const newSocket = new WebSocket(config.websocketUrl)

        newSocket.onopen = () => {
            console.log('WebSocket connection established')
            if (username) {
                newSocket.send(JSON.stringify({
                    method: 'New connection',
                    id: params.id,
                    username: username,
                    gamestate: gameState
                }))
            }
        }

        newSocket.onmessage = (event) => {
            const data = JSON.parse(event.data)
 
            if (data) {
                setGameState(data)
            }

            console.log('You have a message: ', event.data)
        }
    
        newSocket.onclose = () => {
            console.log('WebSocket connection closed')
        }
    
        newSocket.onerror = (error) => {
            console.error('WebSocket Error: ', error)
        }

        setSocket(newSocket)

        return () => newSocket.close()
    }, [username, params.id])


    // For new users
    const connectHandler = () => {
        if (usernameRef.current.value) {
            setUsername(usernameRef.current.value)
            setModal(false)
        } else {
            setUsername(`Anon${Math.round(Math.random() * 1000)}`)
            setModal(false)
        }
    }


    // Update game State
    const selectMeme = (meme) => {
        if (socket && socket.readyState === WebSocket.OPEN && !gameState.users[username].selectedMeme) {
            socket.send(JSON.stringify({
                method: 'selectMeme',
                username: username,
                selectedMeme: meme,
                id: params.id
            }))
        }
    }

    const voteForMeme = (selectedUsername) => {
        if (socket && socket.readyState === WebSocket.OPEN && selectedUsername !== username) {
            socket.send(JSON.stringify({
                method: 'vote',
                voter: username,
                voteFor: selectedUsername,
                id: params.id
            }))
            console.log('New voter: ', username)
        }
    }


    const styles = ['orange', 'red', 'blue', 'purple', 'pink', 'green', ]
    if (gameState?.users) {
        var players = Object.keys(gameState.users).map((playerName) => {
            if (playerName !== 'users' && playerName !== 'currentSituation' && playerName !== 'currentRound') {
                const playerData = gameState.users[playerName]
                let playerStyle = styles[Math.floor(Math.random() * styles.length)]
                return (
                    <div key={playerName} className='player'>
                        <h5 style={{color: 'black'}}>{playerName}</h5>
                        <h6 style={{color: 'black'}}>{playerData.points}</h6>
                        <button onClick={() => voteForMeme(playerName)}>
                            <img className='rounded selectedMeme' src={playerData.selectedMeme} />
                        </button>
                    </div>
                )
            } else {
                return null
            }   
        })
    }
    

    return (
        <div className="game">
            <Rules />
            <div className='game-info'>
                <img className='logo' src='https://i.pinimg.com/originals/4b/52/17/4b5217cc5d784890f44aeb01a5ad7db6.png' alt='logo' />
                <h1 className='game-name'>Why are you mem?<span> Beta</span></h1>
            </div>

            <h2 className='round'>Round: {gameState.currentRound}</h2>

            <Modal className='modal' centered show={modal} onHide={() => connectHandler()} >
                <Modal.Header className='centered-modal'>
                    <Modal.Title>Пиши ник сюда</Modal.Title>
                </Modal.Header>
                <Modal.Body className='centered-modal'>
                    <input className='modal-input' type="text" ref={usernameRef} />
                    <Button className='modal-button' variant="warning" onClick={() => connectHandler()}>
                        Войти
                    </Button>
                </Modal.Body>
            </Modal>

            <Players gameState={gameState} voteForMeme={voteForMeme}/>
            {/* <div className="players">{players}</div> */}
            <div className='mx-auto d-flex align-items-center justify-content-center'>
                <div className='situation card text-black bg-warning m-3' >
                    <div className='card-body d-flex align-items-center text-center'>
                        <p className='card-text'>
                            {gameState.currentSituation}
                        </p>
                    </div>
                </div>
            </div>
            <MyMemes myMemes={myMemes} setMyMemes={setMyMemes} selectMeme={selectMeme} />

            {/* <button className='btn btn-warning' onClick={() => {}}>
                Stop Game
            </button> */}
        </div>
    )
}