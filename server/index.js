const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const PORT = process.env.PORT || 5000
const situationsList = require('./situationsList')

let commonState = {}


app.ws('/', (ws, req) => {
    console.log('Connected')

    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case 'New connection':
                connectionHandler(ws, msg)
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


// New user connection
const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    if (!commonState[msg.id]) {
        commonState[msg.id] = {
            users: {},
            currentSituation: randomSituation(),
            currentRound: 1,
            votes: []
        }
    }

    commonState[msg.id].users[msg.username] = {
        selectedMeme: null,
        points: 0,
        isVoted: false,
        isWinner: false,
        round: commonState[msg.id].currentRound,
        ...msg.gamestate[msg.username]
    }

    broadcastUpdatedState(msg)
}


// State update for all users
const broadcastUpdatedState = (msg) => {
    aWss.clients.forEach(client => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(commonState[msg.id]))
        }
    })
    console.log(`new commonState: ${JSON.stringify(commonState)}`)
}


// Meme select handler
const handleSelectMeme = (msg) => {
    if (commonState[msg.id] && commonState[msg.id][msg.username]) {
        commonState[msg.id][msg.username].selectedMeme = msg.selectedMeme
        console.log(`User ${msg.username} selected a meme: ${msg.selectedMeme}`)
    } else {
        commonState[msg.id].users[msg.username] = {
            selectedMeme: msg.selectedMeme,
            points: commonState[msg.id].users[msg.username].points,
            isVoted: false,
            isWinner: false,
            round: commonState[msg.id].currentRound,
        }
    }
    broadcastUpdatedState(msg)
}


// Vote for memes
const handleVote = (msg) => {
    const sessionData = commonState[msg.id]
    if (!sessionData) {
        console.log("Session not found")
        return
    }

    if (!sessionData.votes.includes(msg.voter)) {
        sessionData.votes.push(msg.voter)
        if (sessionData.users[msg.voteFor]) {
            sessionData.users[msg.voteFor].points += 1
        }
    }

    if (sessionData.votes.length === Object.keys(sessionData.users).length) {
        startNewRound(msg)
    } else {
        broadcastUpdatedState(msg)
    }
}


// New random situation from list
function randomSituation() {
    const random = Math.floor(Math.random() * situationsList.length)
    return situationsList[random]
}


// Start new round
const startNewRound = (msg) => {
    const newSituation = randomSituation()
    const sessionData = commonState[msg.id]
    sessionData.currentSituation = newSituation
    sessionData.currentRound += 1
    sessionData.votes = []
  
    Object.keys(commonState[msg.id].users).forEach(username => {
        sessionData.users[username] = {
            ...sessionData.users[username],
            isVoted: false,
            selectedMeme: null,
            round: sessionData.currentRound,
            currentSituation: newSituation
        }
    })

    broadcastUpdatedState(msg)
    console.log('new round is started')
}