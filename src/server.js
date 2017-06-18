const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const routes = require('./routes')

require('./models')

mongoose.Promise = global.Promise

const app = express()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3001

app.use(cors())

app.set('port', port)
app.use('/', routes)

connect()
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen)

function connect () {
    return mongoose.connect(process.env.MONGODB_CON).connection
}

function listen () {
    let server = app.listen(port, host, () => {
        console.log('Server listening on ' + host + ':' + port)
    })
    server.on('error', console.log)
}
