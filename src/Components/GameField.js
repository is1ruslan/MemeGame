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
    const [round, setRound] = useState(1)
    const [winner, setWinner] = useState(false)
    const [voted, setVoted] = useState(false)
    const [selectedMeme, setSelectedMeme] = useState(null);
    const [votes, setVotes] = useState({})


    // New user connection
    useEffect(() => {  
        if (username) {
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


    // Update game state for all players
    useEffect(() => {
        socket.onerror = (error) => {
            console.error('WebSocket Error:', error)
        }

        socket.onclose = () => {
            console.log('WebSocket connection closed.')
        }

        setGameState(prevState => updateMemes(prevState))
        if (Object.keys(gameState).length > 0 && username) { 
            socket.send(JSON.stringify({
                method: 'stateUpdate',
                id: params.id,
                username: username,
                gamestate: gameState,
            }))
            console.log(gameState)
            // socket.onmessage = (event) => {
            //     setGameState(prevState => event.data)
            //     console.log(gameState)
            //     console.log('You have a message:', event.data)
            // }
        }
    }, [myMemes, winner, voted, selectedMeme, votes])


    // For new users
    const connectHandler = () => {
        setUsername(usernameRef.current.value)
        setModal(false)
    }

    const addUser = (prevState, userName) => {
        return {
            ...prevState,
            [userName]: {
                memes: myMemes,
                points: 0,
                isVoted: voted,
                selectedMeme: selectedMeme,
                isWinner: winner
            }
        }
    }


    // Update game State
    const updateMemes = (prevState) => {
        return {
            ...prevState, 
            [username]: {
                ...prevState[username],
                memes: myMemes,
                selectedMeme: selectedMeme
            }
        }
    }

    const selectMeme = (meme) => {
        setSelectedMeme(meme)
    }

    const voteForMeme = (selectedUsername) => {
        if (selectedUsername !== username) {
            socket.send(JSON.stringify({
                method: 'vote',
                username: username,
                voter: selectedUsername,
                id: params.id
            }))
        }
    }

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.method === 'updateVotes') {
            setVotes(data.votes)
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
        setSelectedMeme(null)
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

    function onVote() {

    }

    const Meme = ({ onVote, isVotable }) => {
        <div onClick={isVotable ? onVote : null} style={{ cursor: isVotable ? 'pointer' : 'default' }}>
            <img src={selectedMeme} alt="Meme" />
        </div>  
    }
    
    let players = Object.keys(gameState).map((playerName) => {
        const playerData = gameState[playerName]
        return (
            <div key={playerName} className="player">
                <h3>{playerName}</h3>
                <h5>{playerData.points}</h5>
                {playerData.memes.map((meme, index) => (
                    <Meme 
                        key={index} 
                        image={meme} 
                        onVote={() => voteForMeme(playerName)} 
                        isVotable={playerName !== username}
                    />
                ))}
            </div>
        )
    })

    return (
        <div className="game">
            <button className='btn btn-primary' onClick={() => getPoint()}>+Point</button>
            
            <h2>Round: {round}</h2>

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
            <Situations situations={situations} setsituations={setsituations} />
            <MyMemes myMemes={myMemes} setMyMemes={setMyMemes} setSelectedMeme={setSelectedMeme} />
        </div>
    )
}