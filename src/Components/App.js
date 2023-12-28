import React, { useState, useEffect } from 'react'
import Situations from './Situations'
import MyMemes from './MyMemes'
import Start from './Start'
import GameField from './GameField'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
const socket = new WebSocket('ws://localhost:5000/')

export default function App () {
    const [gameStarted, setGameStarted] = useState(false)

    socket.onopen = () => {
        console.log('Connected')
        socket.send(JSON.stringify('hello'))
    }

    socket.onmessage = (event) => {
        console.log('You have a message:', event.data)
    }

    return (
        <BrowserRouter>
            <div>
                {
                !gameStarted ?
                    <Switch>
                        <Route path='/:id'>
                            <GameField />
                            <Situations />
                            <MyMemes />
                        </Route>
                        <Redirect to={`${+new Date}`.toString(16)}/>
                    </Switch>
                :
                <Start setGameStarted={setGameStarted} />
                }
            </div>
        </BrowserRouter>
    )
}