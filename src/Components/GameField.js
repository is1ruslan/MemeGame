import React, { useState, useEffect, useRef } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import {ReactComponent as ShareIcon} from './icons/share-apple.svg';
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
    const [isGameStopped, setIsGameStopped] = useState(false)


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
    }, [gameState, username, params.id])


    useEffect(() => {
        connectSocket()
        
        return () => {
            if (socket) socket.close()
        }
    }, [username, params.id])


    const share = async () => {
        const url = `http://13.51.160.23/${params.id}`

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Привет', 
                    text: 'Заходи, я создал', 
                    url: params.id, 
                })
                console.log('Share successful')
            } catch(error) {
                alert('Share error: ' + error)
            }
        } else if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(url)
                console.log('Link has copied')
            } catch (error) {
                console.error('Copy error: ', error)
            }
        } else {
            console.log('Автоматическое копирование недоступно. Пожалуйста, скопируйте ссылку вручную.')
        }
    } 

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


    const connectSocket = () => {
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

            // Trying to reconnect user if he had been disconnected by server 
            setTimeout(connectSocket, 3000)
        }
    
        newSocket.onerror = (error) => {
            console.error('WebSocket Error: ', error)
            alert('WebSocket Error: ' + error)
        }

        setSocket(newSocket)
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
                method: 'voteForMeme',
                voter: username,
                voteFor: selectedUsername,
                id: params.id
            }))
            console.log('New voter for meme: ', username)
        }
    }

    const voteForStopGame = () => {
        if (socket && socket.readyState === WebSocket.OPEN && !gameState.stopGameVotes.includes(username)) {
            socket.send(JSON.stringify({
                method: 'voteForStopGame',
                voter: username,
                id: params.id
            }))
            console.log('New voter for stop game: ', username)
        }
    }

    if (gameState?.users && gameState.stopGameVotes.length / Object.keys(gameState.users).length >= 0.5 && !isGameStopped) {
        setIsGameStopped(true)
    }
    

    return (
        <div className="game">
            <Modal className='modal' centered show={modal} onHide={() => connectHandler()} >
                <Modal.Header className='centered-modal'>
                    <Modal.Title>Пиши ник сюда</Modal.Title>
                </Modal.Header>
                <Modal.Body className='centered-modal'>
                    <input className='modal-input' type="text" ref={usernameRef} />
                    <p className='link-p'>Ссылка на комнату</p>
                    <div className='link-block'>
                        <div className='room-link'>
                            <p>{'13.51.160.23/'+params.id}</p>
                            <button className='icon copy-icon' onClick={share}><ShareIcon /></button>
                        </div>
                    </div>
                    <Button className='modal-button' variant="warning" onClick={() => connectHandler()}>
                        Войти
                    </Button>
                </Modal.Body>
            </Modal>


            <Rules />
            <div className='game-info'>
                <img className='logo' src='https://i.pinimg.com/originals/4b/52/17/4b5217cc5d784890f44aeb01a5ad7db6.png' alt='logo' />
                <h1 className='game-name'>Why are you mem?<span> Beta</span></h1>
            </div>

            <h2 className='round'>Раунд: {gameState.currentRound}</h2>

            <Players gameState={gameState} voteForMeme={voteForMeme} isGameStopped={isGameStopped}/>
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

            <button className='btn btn-warning' onClick={voteForStopGame}>
                Остановить игру
            </button>
        </div>
    )
}