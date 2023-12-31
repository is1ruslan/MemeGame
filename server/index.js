const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const PORT = process.env.PORT || 5000

app.ws('/', (ws, req) => {
    console.log('Connected')
    //ws.send('You are connected')

    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case 'New connection':
                connectionHandler(ws, msg)
                break 
            case 'stateUpdate':
                connectionHandler(ws, msg)
                //handleSelectMeme(msg)
                break
            case 'selectMeme':
                handleSelectMeme(msg)
                break
            case 'vote':
                handleVote(msg)
                break
        }
    })
})

app.listen(PORT, () => console.log(`Port started on Port ${PORT}`))

const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    broadcastConnection(ws, msg)
}

let commonState = {}

const broadcastConnection = (ws, msg) => {

    if (!commonState[msg.id]) {
        commonState[msg.id] = {};
    }

    aWss.clients.forEach(client => {
        if (client.id === msg.id) {
            commonState[msg.id][msg.username] = msg.gamestate[msg.username]
        }
        client.send(JSON.stringify(commonState[msg.id]))
    })

    console.log(`The new commonState: ${JSON.stringify(commonState)}`)
}

// Обработка выбора мема
const handleSelectMeme = (msg) => {
    if (commonState[msg.id] && commonState[msg.id][msg.username]) {
        commonState[msg.id][msg.username].selectedMeme = msg.selectedMeme
        console.log(`User ${msg.username} selected a meme: ${msg.selectedMeme}`)
    } else {
        commonState[msg.id][msg.username] = {
            selectedMeme: msg.selectedMeme,
            points: 0,
            isVoted: false,
            isWinner: false,
            round: 1, //need to change
            situation: 0 //need to change
        }
    }
    broadcastUpdatedState(msg)
}

const broadcastUpdatedState = (msg) => {
    aWss.clients.forEach(client => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(commonState[msg.id]))
        }
    })
    console.log(`commonState after memselect: ${JSON.stringify(commonState)}`)
}

// Обработка голоса за мем
const handleVote = (msg) => {
    if (commonState[msg.id][msg.voteFor]) {
        commonState[msg.id][msg.voteFor].points += 1
    }
    commonState[msg.id][msg.voter].isVoted = true

    // Проверка, проголосовали ли все игроки
    if (allPlayersVoted(msg.id)) {
        startNewRound(msg.id)
    } else {
        broadcastUpdatedState(msg.id)
    }
}

const allPlayersVoted = (sessionId) => {
    return Object.values(commonState[sessionId]).every(player => player.isVoted)
}

const startNewRound = (sessionId) => {
    Object.keys(commonState[sessionId]).forEach(username => {
        commonState[sessionId][username] = {
            ...commonState[sessionId][username],
            isVoted: false,
            selectedMeme: null,
            round: commonState[sessionId][username].round + 1,
            situation: 0,
            isWinner: false
        }
    })

    broadcastUpdatedState(sessionId)
}