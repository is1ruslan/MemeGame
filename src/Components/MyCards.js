import React, { useState, useEffect } from 'react'

export default function MyCards () {
    const [myMemes, setMyMemes] = useState([])
    const [unUsedMemes, setUnUsedMemes] = useState()

    useEffect(() => {
        startMemes()
        console.log('11')
    }, [])

    async function startMemes() {
        let arr = []
        const response = await fetch('https://api.imgflip.com/get_memes')
        const data = await response.json()
        const memes = data.data.memes
        console.log(memes.length)

        for (let i = 0; i < 7; i++) {
            const rand = Math.round(Math.random() * memes.length)
            arr[i] = memes[rand].url
        }
        setMyMemes(arr)
        setUnUsedMemes(memes)
    }

    // const fetchMeme = async () => {
    //     const response = await fetch('https://api.imgflip.com/get_memes')
    //     const data = await response.json()
    //     for (let i = 0; i < 7; i++) {
    //         const rand = Math.round(Math.random() * data.data.memes.length)
    //         arr[i] = data.data.memes[rand].url
    //     }
    //     setMemeUrl(arr)
    // }

    const changeMeme = async (ind) => {
        const memes = unUsedMemes
        const rand = Math.round(Math.random() * memes.length)
        const newMeme = myMemes.map((meme, i) =>
            i === ind ?
            memes[rand].url :
            meme
        )
        setMyMemes(newMeme);
    }

    let Memes = myMemes.map((meme, ind) => (
        <li key={ind}>
            {<img className='rounded mymemes' src={meme} onClick={() => changeMeme(ind)} alt='Random meme'/>}
        </li>
    ))

    return (
        <div>
            <div className="container">
                <ul>
                    {Memes}
                </ul>
            </div>
        </div>
    )
}