import React, { useState, useEffect, useRef } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import MyMemes from './MyMemes'
import Situations from './Situations'

export default function GameField ({ situations, setsituations }) {
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
    //const [selectedMeme, setSelectedMeme] = useState(null);
    const [votes, setVotes] = useState({})
    const [currentSituation, setCurrentSituation] = useState('')


    // New user connection
    // useEffect(() => { 
    //     const socket = new WebSocket('ws://localhost:5000/')
        
    //     socket.onopen = () => {
    //         if (username) {
    //             setGameState(prevState => {
    //                 const updatedState = addUser(prevState, username)
    //                 socket.send(JSON.stringify({
    //                     method: 'New connection',
    //                     id: params.id,
    //                     username: username,
    //                     gamestate: updatedState
    //                 }))
    //                 return updatedState
    //             })
    //         }
    //     }
        
    //     // socket.onmessage = (event) => {
    //     //     setGameState(JSON.parse(event.data) || {})
    //     //     console.log('New user connected:', event.data)
    //     // }
    // }, [username])


    // Update game state for all players
    useEffect(() => {
        //setGameState(prevState => updateMemes(prevState))

        if (socket && socket.readyState === WebSocket.OPEN) {
            if (Object.keys(gameState).length > 0 && username) { 
                socket.send(JSON.stringify({
                    method: 'stateUpdate',
                    id: params.id,
                    username: username,
                    gamestate: gameState,
            }))
        }}
        
        console.log(gameState)
            // socket.onmessage = (event) => {
            //     const data = JSON.parse(event)
            //     if (event) {
            //         setGameState(data.params.id)
            //         console.log('data recieved')
            //     } else if (data.method === 'updateVotes') {
            //         setVotes(data.votes)
            //     }
            //     console.log('You have a message: ', event)
            // }
            // console.log(gameState)
        //}
    }, [myMemes, winner, voted, votes])

    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:5000/')

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
                // if (data[username] && data[username].selectedMeme) {
                //     setSelectedMeme(data[username].selectedMeme)
                // }
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

    const addUser = (prevState, userName) => {
        return {
            ...prevState,
            [userName]: {
                points: 0,
                isVoted: voted,
                selectedMeme: null,
                isWinner: winner,
                round: round,
                situation: currentSituation,
            }
        }
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
            setVoted(true);
        }
    }

    // socket.onmessage = (event) => {
    //     const data = JSON.parse(event.data)
    //     if (data.method === 'updateVotes') {
    //         setVotes(data.votes)
    //     }
    // }

    const endRound = () => {
        const newGameState = { ...gameState }
        Object.keys(votes).forEach(username => {
            if (newGameState[username]) {
                newGameState[username].points += votes[username]
            }
        })
    
        setGameState(newGameState)
        setRound(prev => prev + 1)
        //setSelectedMeme(null)
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

    // const Meme = ({ onVote, isVotable }) => {
    //     <div onClick={isVotable ? onVote : null} style={{ cursor: isVotable ? 'pointer' : 'default' }}>
    //         <img src={selectedMeme} alt="Meme" />
    //     </div>  
    // }

    if (gameState?.users) {
        var players = Object.keys(gameState).map((playerName) => {
            if (playerName != 'users' && playerName != 'currentSituation' && playerName != 'currentRound') {
                const playerData = gameState[playerName]
                return (
                    <div key={playerName} className="player">
                        <h3>{playerName}</h3>
                        <h5>{playerData.points}</h5>
                        {playerData.selectedMeme ?
                            <img className='rounded mymemes selectedMeme' src={gameState[playerName].selectedMeme} alt='Selected meme' onClick={() => voteForMeme(playerName)}/>
                        :
                        null
                        }
                    </div>
                )
            }
            
        })
    }

    

    return (
        <div className="game">
            <button className='btn btn-primary' onClick={() => getPoint()}>+Point</button>
            
            <h2 className='round'>Round: {round}</h2>

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

            <div className="players">{players}</div>
            <div className='mx-auto d-flex align-items-center justify-content-center'>
                <div className='card text-black bg-warning m-3' style={{height: 300, width: 200}}>
                    <div className='card-body d-flex align-items-center text-center'>
                        <p className='card-text'>
                            {gameState.currentSituation}
                            {/* {Object.values(gameState.users)[0]?.situation} */}
                        </p>
                    </div>
                </div>
            </div>
            {/* <Situations currentSituation={currentSituation} setCurrentSituation={setCurrentSituation} /> */}
            <MyMemes myMemes={myMemes} setMyMemes={setMyMemes} selectMeme={selectMeme} />
        </div>
    )
}