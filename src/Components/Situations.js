import React, { useState, useEffect } from 'react'

export default function Situations () {
    //const [situations, setsituations] = useState(list)
    const [currentSituation, setCurrentSituation] = useState('')

    // function randomSituation () {
    //     const random = Math.round(Math.random() * situations.length)
    //     return situations[random]
    // }

    // useEffect(() => {
    //     const socket = new WebSocket('ws://localhost:5000/')

    //     socket.onmessage = (event) => {
    //         const data = JSON.parse(event.data)
    
    //         if (data) {
    //             console.log(data.currentSituation)
    //             //setCurrentSituation(data.currentSituation)
    //         }
    //     }
    // }, [socket])

    return (
        <div className='mx-auto d-flex align-items-center justify-content-center'>
            <div className='card text-black bg-warning m-3' style={{height: 300, width: 200}}>
                <div className='card-body d-flex align-items-center text-center'>
                    <p className='card-text'>
                        {currentSituation}
                    </p>
                </div>
            </div>
        </div>
    )
}