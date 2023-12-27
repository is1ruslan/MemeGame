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
    }

    return (
        <BrowserRouter>
            <div>
                {
                !gameStarted ?
                    // <Switch>
                        // <Route path={path}>
                        <div>
                            <GameField />
                            <Situations />
                            <MyMemes />
                        {/* </Route> */}
                        <Redirect to={`${+new Date}`.toString(16)}/>
                        </div>
                    // </Switch>
                :
                <Start setGameStarted={setGameStarted} />
                }
            </div>
        </BrowserRouter>
    )
}