import React, { useState, useEffect } from 'react'

let arr = [
    'Когда звонят в дверь, а ты делаешь вид, что дома никого нет', 
    '', 
    ''
]

export default function Situations () {
    const [situations, setsituations] = useState(arr)

    return (
        <div className='mx-auto d-flex align-items-center justify-content-center'>
            <div className='card text-black bg-warning mb-3' style={{height: 300, width: 200}}>
                <div className='card-body d-flex align-items-center text-center'>
                    <p className='card-text'>
                        {situations[0]}
                    </p>
                </div>
            </div>
        </div>
    )
}