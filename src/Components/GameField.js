import React, { useState, useEffect, useRef } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import {ReactComponent as ShareIcon} from './icons/share-apple.svg'
import PhoneBg from './icons/bg-phone.png'
import TabletBg from './icons/bg-tablet.png'
import PcBg from './icons/bg-pc.png'
import MyMemes from './MyMemes'
import Players from './Players'
import Header from './Header'
import Situations from './Situations'
import Footer from './Footer'
import config from './config'

export default function GameField () {
    const usernameRef = useRef(null)
    const params = useParams()
    const [socket, setSocket] = useState(null)
    const [gameState, setGameState] = useState({})
    const [enterModal, setEnterModal] = useState(true)
    const [username, setUsername] = useState('')
    const [isGameStopped, setIsGameStopped] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    let countUsers = 0


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
 

    // For new users
    const connectHandler = () => {
        if (usernameRef.current.value) {
            setUsername(usernameRef.current.value)
            setEnterModal(false)
        } else {
            setUsername(`Anon${Math.round(Math.random() * 1000)}`)
            setEnterModal(false)
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
            } else {
                // Added to prevent users from selecting the same names
                newSocket.send(JSON.stringify({
                    method: 'New noname connection',
                    id: params.id
                }))
            }
        }

        newSocket.onmessage = (event) => {
            const data = JSON.parse(event.data)
            
            if (data) {
                setGameState(data)
                if (Object.keys(data.users).length === 0) {
                    setIsGameStopped(false)
                    setEnterModal(true)
                }
            }

            console.log('You have a message: ', event.data)
        }
    
        newSocket.onclose = () => {
            console.log('WebSocket connection closed')
            if (!enterModal) {
                alert('Соединение прервано! Переподключитесь, введя такой же ник')
            }

            // Trying to reconnect user if he had been disconnected by server 
            // setTimeout(connectSocket, 3000)
        }
    
        newSocket.onerror = (error) => {
            console.error('WebSocket Error: ', error)
            // alert('WebSocket Error: ' + error)
        }

        setSocket(newSocket)
    }


    // Update game State
    const selectMeme = (meme) => {
        if (socket && socket.readyState === WebSocket.OPEN && !gameState.users[username]?.selectedMeme) {
            socket.send(JSON.stringify({
                method: 'selectMeme',
                username: username,
                selectedMeme: meme,
                id: params.id
            }))
        }
    }

    const voteForMeme = (selectedUsername) => {
        if (socket && socket.readyState === WebSocket.OPEN && gameState.users[selectedUsername].selectedMeme) {
            if (countUsers === 1 || selectedUsername !== username) {
                socket.send(JSON.stringify({
                    method: 'voteForMeme',
                    voter: username,
                    voteFor: selectedUsername,
                    id: params.id
                }))
            }
        }
    }

    const voteForStopGame = () => {
        if (socket && socket.readyState === WebSocket.OPEN && !gameState.stopGameVotes.includes(username)) {
            socket.send(JSON.stringify({
                method: 'voteForStopGame',
                voter: username,
                id: params.id
            }))
        }
    }

    const startNewGame = () => {
        if (socket && socket.readyState === WebSocket.OPEN && isGameStopped) {
            socket.send(JSON.stringify({
                method: 'startNewGame',
                id: params.id
            }))
        }
    }

    const disConnectHandler = () => {
        if (socket && socket.readyState === WebSocket.OPEN && username) {
            socket.send(JSON.stringify({
                method: 'disconnectUser',
                id: params.id,
                username: username
            }))
        setEnterModal(true)
        }
    }

    
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
                alert('Link has copied')
            } catch (error) {
                alert('Copy error: ' + error)
            }
        } else {
            alert('Автоматическое копирование недоступно. Пожалуйста, скопируйте ссылку вручную.')
        }
    }


    if (gameState?.users) {
        countUsers = Object.keys(gameState.users).length
    }

    if (gameState?.users && (gameState?.stopGameVotes?.length / countUsers >= 0.5) && !isGameStopped) {
        setIsGameStopped(true)
    }
    
    if (darkMode) {
        document.body.classList.add('dark')
    } else {
        document.body.classList.remove('dark');
    }


    return (
        <div className={`game ${darkMode ? 'dark' : ''}`}>
            <Modal className='modal' centered show={enterModal} onHide={() => connectHandler()} >
                <Modal.Header className='centered-modal'>
                    <Modal.Title>Пиши ник сюда</Modal.Title>
                </Modal.Header>
                <Modal.Body className='centered-modal'>
                    <input className='modal-input' type="text" ref={usernameRef} />
                    <h5 className='link-text'>Ссылка на комнату</h5>
                    <div className='link-block'>
                        <div className='room-link'>
                            <p>{'13.51.160.23/'+params.id}</p>
                            <button className='icon share-icon' onClick={share}><ShareIcon /></button>
                        </div>
                    </div>
                    <Button className='modal-button' variant="warning" onClick={() => connectHandler()}>
                        Войти
                    </Button>
                </Modal.Body>
            </Modal>

            <Header 
                darkMode={darkMode} 
                setDarkMode={setDarkMode} 
            />
            <Players 
                gameState={gameState} 
                voteForMeme={voteForMeme} 
                isGameStopped={isGameStopped} 
                share={share} 
                startNewGame={startNewGame}
            />
            <Situations 
                gameState={gameState}
            />
            <MyMemes 
                selectMeme={selectMeme} 
            />
            <Footer 
                gameState={gameState} 
                disConnectHandler={disConnectHandler} 
                voteForStopGame={voteForStopGame} 
                countUsers={countUsers} 
                share={share} 
            />
            
            <div className='emojies-bg'>
                <img className='pc-bg' src={PcBg} />
                <img className='phone-bg' src={PhoneBg} />
                <img className='tablet-bg' src={TabletBg} />
            </div>
        </div>
    )
}