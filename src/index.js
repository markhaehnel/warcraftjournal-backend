import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import routes from './routes'
import './models'

dotenv.config()

const app = express()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3001

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
