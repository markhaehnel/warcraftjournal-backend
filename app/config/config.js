module.exports = Object.freeze({
    port: process.env.PORT || 3000,
    database: {
        mongo: process.env.MONGODB || 'mongodb://localhost/warcraftjournal'
    },
    logger: {
        folder: 'logs',
        level: 'debug'
    },
    battlenet: {
        clientID: process.env.BATTLENET_CLIENTID || 'yourBnetClientID'
    }
})
