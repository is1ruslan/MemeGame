const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const PORT = process.env.PORT || 5000
const situationsList = require('./situationsList')

let commonState = {}
let unusedSituations = {}


app.ws('/', (ws, req) => {
    //res.set('Cache-Control', 'no-cache')
    console.log('Connected')

    ws.on('message', (msg) => {
        try {
            msg = JSON.parse(msg)
            switch (msg.method) {
                case 'New noname connection':
                    connectionHandler(ws, msg)
                    break
                case 'New connection':
                    connectionHandler(ws, msg)
                    break 
                case 'disconnectUser':
                    disconnectUser(msg)
                    break
                case 'selectMeme':
                    handleSelectMeme(msg)
                    break
                case 'voteForMeme':
                    handleVoteForMeme(msg)
                    break
                case 'voteForStopGame':
                    handleVoteForStopGame(msg)
                    break
                case 'startNewGame':
                    handleStartNewGame(msg)
                    break
            }
        } catch (error) {
            console.error('Error with message processing', error)
        }
    })
})

app.listen(PORT, () => console.log(`Port started on Port ${PORT}`))


// State update for all users
const broadcastUpdatedState = (msg) => {
    aWss.clients.forEach(client => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(commonState[msg.id]))
        }
    })
    console.log(`new commonState: ${JSON.stringify(commonState)}${'\n'}`)
}


// New user connection
const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    if (!commonState[msg.id]) {
        commonState[msg.id] = {
            currentSituation: randomSituation(msg),
            currentRound: 1,
            votes: [],
            stopGameVotes: [],
            users: {}
        }
    }

    if (!commonState[msg.id].users[msg.username] && msg.username) {
        commonState[msg.id].users[msg.username] = {
            selectedMeme: '',
            points: 0,
        }
    } else if (commonState[msg.id].users[msg.username] && msg.username) {
        commonState[msg.id].users[msg.username] = {
            selectedMeme: '',
            points: commonState[msg.id].users[msg.username]?.points
        }
    }

    broadcastUpdatedState(msg)
}


// Meme select handler
const handleSelectMeme = (msg) => {
    if (commonState[msg.id] && commonState[msg.id].users[msg.username]) {
        commonState[msg.id].users[msg.username].selectedMeme = msg.selectedMeme
        console.log(`User ${msg.username} selected a meme: ${msg.selectedMeme}`)
    } else {
        commonState[msg.id].users[msg.username] = {
            selectedMeme: msg.selectedMeme,
            points: commonState[msg.id].users[msg.username]?.points,
        }
    }
    broadcastUpdatedState(msg)
}


// Vote for memes
const handleVoteForMeme = (msg) => {
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

const handleVoteForStopGame = (msg) => {
    const sessionData = commonState[msg.id]
    const countUsers = Object.keys(sessionData.users).length

    sessionData.stopGameVotes.push(msg.voter)

    if (sessionData.stopGameVotes.length / countUsers >= 0.5) {
        console.log('The game is stopped')
    }

    broadcastUpdatedState(msg)
}

const handleStartNewGame = (msg) => {
    unusedSituations[msg.id] = new Set(situationsList)

    commonState[msg.id] = {
        currentSituation: randomSituation(msg),
        currentRound: 1,
        votes: [],
        stopGameVotes: [],
        users: {}
    }

    broadcastUpdatedState(msg)
}

const disconnectUser = (msg) => {    
    if (msg.username) {
        delete commonState[msg.id].users[msg.username]
    }

    broadcastUpdatedState(msg)
}


// New random situation from list
function randomSituation(msg) {
    if (!unusedSituations[msg.id] || unusedSituations[msg.id].size === 0) {
        unusedSituations[msg.id] = new Set(situationsList)
    }

    const situationsArray = Array.from(unusedSituations[msg.id])
    const random = Math.floor(Math.random() * situationsArray.length)
    const selectedSituation = situationsArray[random]
    unusedSituations[msg.id].delete(selectedSituation)
    
    return selectedSituation
}


// Start new round
const startNewRound = (msg) => {
    const sessionData = commonState[msg.id]
    sessionData.currentSituation = randomSituation(msg)
    sessionData.currentRound += 1
    sessionData.votes = []
    sessionData.stopGameVotes = []
  
    Object.keys(commonState[msg.id].users).forEach(username => {
        sessionData.users[username] = {
            ...sessionData.users[username],
            selectedMeme: null
        }
    })

    broadcastUpdatedState(msg)
    console.log('new round is started')
}