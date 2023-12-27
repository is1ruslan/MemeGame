import React, { useState, useEffect } from 'react'
import Situations from './Situations'
import MyMemes from './MyMemes'
import Start from './Start'
const socket = new WebSocket('ws://localhost:3000/')

export default function App () {
    const [gameStarted, setGameStarted] = useState(false)

    socket.onopen = () => {
        console.log('Connected')
    }

    return (
        <div>
            {
            !gameStarted ?
                <div className=''>
                    <Situations />
                    <MyMemes />
                </div>
            :
            <Start setGameStarted={setGameStarted} />
            }
        </div>
    )
}