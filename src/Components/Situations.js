import React from 'react'

export default function Situations ({ gameState }) {

    return (
        <div className='mx-auto d-flex align-items-center justify-content-center'>
                <div className='card text-black bg-warning m-3' >
                    <div className='situation card-body d-flex align-items-center text-center'>
                    <p className='card-text'>
                        {gameState.currentSituation}
                    </p>
                </div>
            </div>
        </div>
    )
}