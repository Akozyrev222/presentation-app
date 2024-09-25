const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const cors = require('cors')
const fs = require('fs')
const path = require('path')


const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.ws('/', (ws, res) => {
    console.log('Connected')
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case 'connection':
                connectionHandler(ws, msg)
                break
            case 'draw':
                broadcastConnection(ws, msg)
                break
        }
    })
})

app.post('/image', (req, res) => {
    try {
        const data = req.body.img.replace('data:image/png;base64,', '')
        fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`), data, 'base64')
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
})
app.get('/image', (req, res) => {
    try {

    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
})

const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    broadcastConnection(ws, msg)
}
const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg))
        }
    })
}
app.listen(PORT, () => {
    console.log(`server start port ${PORT}`)
})