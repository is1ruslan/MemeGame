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
            case 'connection':
                connectionHandler(ws, msg)
                console.log(msg.username)
                break 
        }
    })
})

app.listen(PORT, () => console.log(`Port started on Port ${PORT}`))

const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    broadcastConnection(ws, msg)
}

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if (client.id === msg.id) {
            client.send(`User ${msg.username} connected`)
        }
    })
}