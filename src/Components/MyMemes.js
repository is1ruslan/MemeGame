import React, { useState, useEffect } from 'react'
import selectedMemes2 from './memes/selected2'

export default function MyMemes ({ myMemes, setMyMemes, selectMeme }) {
    const [unusedMemes, setUnusedMemes] = useState()

    useEffect(() => {
        startMemes()
    }, [])

    async function startMemes() {
        let arr = []
        // const response = await fetch('https://api.imgflip.com/get_memes')
        // const data = await response.json()
        // const memes = data.data.memes
        const memes = selectedMemes2

        for (let i = 0; i < 9; i++) {
            let rand = Math.floor(Math.random() * memes.length)
                while (arr.includes(memes[rand])) {
                    rand = Math.floor(Math.random() * memes.length)
                }
            arr[i] = memes[rand]
        }
        setMyMemes(arr)
        setUnusedMemes(memes)
    }

    const changeMeme = async (ind) => {
        const memes = unusedMemes
        let rand = Math.floor(Math.random() * memes.length)

        const newMeme = myMemes.map((meme, i) => {
            if (i === ind) {
                while (myMemes.includes(memes[rand])) {
                    rand = Math.floor(Math.random() * memes.length)
                }
                selectMeme(meme)
                return memes[rand]
            } else return meme
        })
        setMyMemes(newMeme)
    }

    let Memes = myMemes.map((meme, ind) => (
        <li key={ind}>
            <button className='mem' onClick={() => changeMeme(ind)} >
                <img className='rounded mymemes' src={meme} alt='Random meme'/>
            </button>
        </li>
    ))

    return (
        <div className="container-ms">
            <ul className='memes-list'>
                {Memes}
            </ul>
        </div>
    )
}