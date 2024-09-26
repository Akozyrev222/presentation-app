const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const {uploadStorage, downloadStorage} = require('./middleware/storage')
require('dotenv').config()


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


app.post('/image', async (req, res) => {
    try {
        const data = req.body.img
        const upload_file = await uploadStorage(data, `${req.query.id}.jpg`)
        return res.status(200).json(upload_file)
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
})
app.get('/image', async (req, res) => {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        const name =  `${req.query.id}.jpg`
        const downloaded_file = await downloadStorage(name)
        return res.status(200).json(downloaded_file)
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