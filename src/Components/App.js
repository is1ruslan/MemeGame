import React, { useState } from 'react'
import Start from './Start'
import GameField from './GameField'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

export default function App () {
    const [gameStarted, setGameStarted] = useState(false)

    return (
        <BrowserRouter>
            <div>
                {
                !gameStarted ?
                    <Switch>
                        <Route path='/:id'>
                            <GameField />
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