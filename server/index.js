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

    console.log(commonState)
}