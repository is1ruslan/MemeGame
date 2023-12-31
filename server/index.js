const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const PORT = process.env.PORT || 5000
const situationsList = require('./situationsList')

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
    if (!commonState[msg.id]) {
        commonState[msg.id] = {
            users: {},
            currentSituation: randomSituation(),
            currentRound: 1
        }
    }

    // Добавляем нового игрока или обновляем существующего
    commonState[msg.id].users[msg.username] = msg.gamestate[msg.username] || {
        selectedMeme: null,
        points: 0,
        isVoted: false,
        isWinner: false,
        situation: commonState[msg.id].currentSituation,
        round: commonState[msg.id].currentRound
    }

    broadcastUpdatedState(msg.id)
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
            situation: 'currentSituation' //need to change
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

// Рандомная ситуация из списка
function randomSituation() {
    const random = Math.floor(Math.random() * situationsList.length)
    return situationsList[random]
}

const getSituation = (msg) => {
    const currentSituation = randomSituation()

    aWss.clients.forEach(client => {
        if (client.id === msg.id) {
            client.send(JSON.stringify({
                method: 'getSituation',
                situation: currentSituation
            }))
        }
    })

    console.log(`Situation sent: ${currentSituation}`)
}

// Начало нового раунда
const allPlayersVoted = (sessionId) => {
    return Object.values(commonState[sessionId]).every(player => player.isVoted)
}

const startNewRound = (sessionId) => {
    const newSituation = randomSituation();
    commonState[sessionId].currentSituation = newSituation;
    commonState[sessionId].currentRound += 1;

    Object.keys(commonState[sessionId].users).forEach(username => {
        commonState[sessionId].users[username].isVoted = false;
        commonState[sessionId].users[username].selectedMeme = null;
        commonState[sessionId].users[username].situation = newSituation;
        commonState[sessionId].users[username].round = commonState[sessionId].currentRound;
    });

    broadcastUpdatedState(sessionId);
}