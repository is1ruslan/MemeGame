import React, { useState, useEffect } from 'react'

export default function MyMemes ({ myMemes, setMyMemes, selectMeme }) {
    const [unUsedMemes, setUnUsedMemes] = useState()

    useEffect(() => {
        startMemes()
    }, [])

    async function startMemes() {
        let arr = []
        const response = await fetch('https://api.imgflip.com/get_memes')
        const data = await response.json()
        const memes = data.data.memes

        for (let i = 0; i < 9; i++) {
            const rand = Math.round(Math.random() * memes.length)
            arr[i] = memes[rand].url
        }
        setMyMemes(arr)
        setUnUsedMemes(memes)
    }

    const changeMeme = async (ind) => {
        const memes = unUsedMemes
        const rand = Math.round(Math.random() * memes.length)
        const newMeme = myMemes.map((meme, i) => 
            i === ind ?
                (selectMeme(meme),
                memes[rand].url)
            : meme
        )
        setMyMemes(newMeme)
    }

    let Memes = myMemes.map((meme, ind) => (
        <li key={ind}>
            <button onClick={() => changeMeme(ind)}>
                <img className='rounded mymemes' src={meme} alt='Random meme'/>
            </button>
        </li>
    ))

    return (
        <div>
            <div className="container">
                <ul className='memes-list'>
                    {Memes}
                </ul>
            </div>
        </div>
    )
}