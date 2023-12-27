import React, { useState, useEffect } from 'react'

export default function MyCards () {
    const [memeUrl, setMemeUrl] = useState([])

    // const fetchMeme = async () => {
    //     const response = await fetch('https://api.memegen.link/templates/')
    //     const data = await response.json()
    //     const rand = Math.round(Math.random() * data.length)
    //     setMemeUrl(data[rand].blank)
    // }

    let arr = []
    let myMemes = memeUrl.map((meme, ind) => (
        <li key={ind}>
            {<img className='rounded mymemes' src={meme} alt='Random meme'/>}
        </li>
    ))

    const fetchMeme = async () => {
        const response = await fetch('https://api.imgflip.com/get_memes')
        const data = await response.json()
        for (let i = 0; i < 7; i++) {
            const rand = Math.round(Math.random() * data.data.memes.length)
            arr[i] = data.data.memes[rand].url
        }
        setMemeUrl(arr)
    }

    useEffect(() => {
        fetchMeme()
    }, [])

    return (
        <div>
            <div className="container">
                <button className="btn btn-warning" onClick={fetchMeme}>Warning!!!</button>
                <ul>
                    {myMemes}
                </ul>
            </div>
        </div>
    )
}