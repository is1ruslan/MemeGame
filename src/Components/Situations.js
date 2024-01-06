import React, { useState } from 'react'

export default function Situations () {
    const [currentSituation, setCurrentSituation] = useState('')

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