import React, { useState, useEffect } from 'react'
import Situations from './Situations'
import MyCards from './MyCards'
import Start from './Start'

export default function App () {
    const [gameStarted, setGameStarted] = useState(false)

    return (
        <div>
            {
            !gameStarted ?
                <div className=''>
                    <Situations />
                    <MyCards />
                </div>
            :
            <Start setGameStarted={setGameStarted} />
            }
        </div>
    )
}