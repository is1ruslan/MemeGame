const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const PORT = process.env.PORT || 5000

app.ws('/', (ws, req) => {
    console.log('Connected')
    ws.send('You are connected')

    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case 'connection':
                aWss.clients.forEach(client => {
                    if (client.id === msg.id) {
                        client.send(`User ${msg.username} connected`)
                    }
                })
                console.log(msg.username)
                break
        }
    })
})

app.listen(PORT, () => console.log(`Port started on Port ${PORT}`))