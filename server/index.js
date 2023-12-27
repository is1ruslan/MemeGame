const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)

const PORT = process.env.PORT || 3000

app.ws('/', (ws, req) => {
    console.log('Connected')
})

app.listen(PORT, () => console.log(`Port started on Port ${PORT}`))