import React, { useState, useEffect, useRef } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import MyMemes from './MyMemes'

export default function GameField () {
    const usernameRef = useRef(null)
    const params = useParams()
    const [socket, setSocket] = useState(null)
    const [myMemes, setMyMemes] = useState([])
    const [gameState, setGameState] = useState({})
    const [modal, setModal] = useState(true)
    const [username, setUsername] = useState('')
    const [round, setRound] = useState(1)
    const [winner, setWinner] = useState(false)
    const [voted, setVoted] = useState(false)
    const [votes, setVotes] = useState({})
    const [currentSituation, setCurrentSituation] = useState('')


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
    }, [myMemes, winner, voted, votes])


    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:5000')

        newSocket.onopen = () => {
            console.log('WebSocket connection established')
            if (username) {
                newSocket.send(JSON.stringify({
                    method: 'New connection',
                    id: params.id,
                    username: username,
                    gamestate: gameState
                }))
                console.log(gameState)
            }
        }

        newSocket.onmessage = (event) => {
            const data = JSON.parse(event.data)

            if (data.method === 'getSituation') {
                setCurrentSituation(data.situation)
            } else if (data.method === 'updateVotes') {
                setVotes(data.votes)
            } else if (data) {
                console.log(data)
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
    }, [username, params.id, round, votes])


    // For new users
    const connectHandler = () => {
        setUsername(usernameRef.current.value)
        setModal(false)
    }


    // Update game State
    const selectMeme = (meme) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({
                method: 'selectMeme',
                username: username,
                selectedMeme: meme,
                id: params.id
            }))
        }
    }

    const voteForMeme = (selectedUsername) => {
        if (socket && socket.readyState === WebSocket.OPEN && selectedUsername !== username && !voted) {
            socket.send(JSON.stringify({
                method: 'vote',
                voter: username,
                voteFor: selectedUsername,
                id: params.id
            }))
            console.log('New voter: ', username)
        }
    }

    const endRound = () => {
        const newGameState = { ...gameState }
        Object.keys(votes).forEach(username => {
            if (newGameState[username]) {
                newGameState[username].points += votes[username]
            }
        })
    
        setGameState(newGameState)
        setRound(prev => prev + 1)
        setVotes({})
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

    let styles = ['orange', 'red', 'blue', 'purple', 'pink', 'green', ]
    if (gameState?.users) {
        var players = Object.keys(gameState.users).map((playerName) => {
            if (playerName != 'users' && playerName != 'currentSituation' && playerName != 'currentRound') {
                const playerData = gameState.users[playerName]
                let playerStyle = styles[Math.floor(Math.random() * styles.length)]
                return (
                    <div key={playerName} className='player'>
                        <h5 style={{color: playerStyle}}>{playerName}</h5>
                        <h6 style={{color: playerStyle}}>{playerData.points}</h6>
                        <button onClick={() => voteForMeme(playerName)}>
                            <img className='rounded mymemes selectedMeme' src={playerData.selectedMeme} alt='Selected meme' />
                        </button>
                    </div>
                )
            }
            
        })
    }
    

    return (
        <div className="game">
            {/* <button className='btn btn-primary' onClick={() => getPoint()}>+Point</button> */}
            <div className='name-info'>
                <img className='logo' src='https://i.pinimg.com/originals/4b/52/17/4b5217cc5d784890f44aeb01a5ad7db6.png' alt='logo' />
                <h1 className='game-name'>Why are you mem?</h1>
            </div>

            <h2 className='round'>Round: {gameState.currentRound}</h2>

            <Modal centered show={modal} onHide={() => {}} >
                <Modal.Header >
                    <Modal.Title>Пиши ник давай</Modal.Title>
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

            <div className="players">{players}</div>
            <div className='mx-auto d-flex align-items-center justify-content-center'>
                <div className='situation card text-black bg-warning m-3' >
                    <div className='card-body d-flex align-items-center text-center'>
                        <p className='card-text'>
                            {gameState.currentSituation}
                        </p>
                    </div>
                </div>
            </div>
            <MyMemes myMemes={myMemes} setMyMemes={setMyMemes} selectMeme={selectMeme} gameState={gameState} username={username}/>
        </div>
    )
}