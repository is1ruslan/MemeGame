import React, { useState, useEffect } from 'react'

export default function Players ({ gameState, voteForMeme }) {
    const [playerStyles, setPlayerStyles] = useState({})
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
    
        setPlayerStyles(newPlayerStyles)
    }


    if (gameState?.users) {
        var players = Object.keys(gameState.users).map((playerName) => {
            if (playerName !== 'users' && playerName !== 'currentSituation' && playerName !== 'currentRound') {
                const playerData = gameState.users[playerName]
                return (
                    <div key={playerName} className='player'>
                        <h5 style={{color: playerStyles[playerName]}}>{playerName}</h5>
                        <h6 style={{color: playerStyles[playerName]}}>{playerData.points}</h6>
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
        <div className="players">{players}</div>
    )
}