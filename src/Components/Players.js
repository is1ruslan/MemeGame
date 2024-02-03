import React, { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import { Modal, Button } from 'react-bootstrap'

export default function Players ({ gameState, voteForMeme, isGameStopped }) {
    const [playerStyles, setPlayerStyles] = useState({})
    const [winners, setWinners] = useState([])
    //const styles = ['orange', 'red', 'blue', 'purple', 'pink', 'green']

    useEffect(() => {
        updateStyles()
    }, [gameState])


    const updateStyles = () => {
        const playersPoints = Object.keys(gameState?.users || {}).map(playerName => ({
            name: playerName,
            points: gameState.users[playerName].points,
        }))
    
        const sortedPlayers = playersPoints.sort((a, b) => b.points - a.points)
        const uniquePoints = Array.from(new Set(sortedPlayers.map(player => player.points)))
    
        const newPlayerStyles = {}
    
        uniquePoints.forEach((points, index) => {
            let style = ''
            if (index === 0) {
                style = 'gold'
            } else if (index === 1) {
                style = 'silver'
            } else if (index === 2) {
                style = 'tan'
            }
    
            sortedPlayers.filter(player => player.points === points).forEach(player => newPlayerStyles[player.name] = style)
        })

        const winnersList = sortedPlayers.filter(player => player.points === uniquePoints[0]).map(player => player.name)

        setWinners(winnersList)
        setPlayerStyles(newPlayerStyles)
    }


    if (gameState?.users) {
        var players = Object.keys(gameState.users).map((playerName) => {
            if (playerName !== 'currentSituation' && playerName !== 'currentRound') {
                const playerData = gameState.users[playerName]
                const isVoted = gameState.votes.includes(playerName) ? '✅' : ''

                return (
                    <div key={playerName} className='player'>
                        <h5 style={{color: playerStyles[playerName]}}>{playerName + isVoted}</h5>
                        <h6 style={{color: playerStyles[playerName]}}>{playerData.points}</h6>
                        <button onClick={() => voteForMeme(playerName)}>
                            <img className='rounded selectedMeme' src={playerData.selectedMeme} alt='' />
                        </button>
                    </div>
                )
            } else {
                return null
            }   
        })
    }

    if (isGameStopped) {
        var showWinners = winners.map((playerName, i) => {
            return <li key={i}><h4>{playerName}</h4></li>
        })
    }


    return (
        <>
        <div className="players">{players}</div>

        {isGameStopped && (
            <>
                <Confetti numberOfPieces={500} gravity={0.1} />
                <Modal centered className='modal' show={true} onHide={() => {}} >
                    <Modal.Header className='centered-modal'>
                        <Modal.Title>И перед нами победитель🎉</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='centered-modal modal'>
                        <ul className='centered-modal'>{showWinners}</ul>
                        <Button className='modal-button' variant="warning" onClick={() => {}}>
                            Начать новую игру
                        </Button>
                    </Modal.Body>
                </Modal>
            </>
        )}
        </>
    )
}