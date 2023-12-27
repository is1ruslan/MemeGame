import React, { useState } from 'react'

export default function startPage ({gameStarted, setGameStarted}) {

    return (
        <div className='container'>
            <div className='row'>
                <div className='col mx-auto d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
                    <button className='btn btn-warning' onClick={() => setGameStarted(true)}>
                        Start
                    </button>
                </div>
            </div>
        </div>
    )
}