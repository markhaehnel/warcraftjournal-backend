const express = require('express')
const compression = require('compression')
const cors = require('cors')
const HttpStatus = require('http-status-codes')
const applicationStorage = require('core/application-storage')
const removeMongoAttributes = require('core/middleware/remove-mongo-attributes')

module.exports.start = async () => {
    let app = express()

    let config = applicationStorage.config
    let logger = applicationStorage.logger

    app.disable('x-powered-by')

    // Enable compression
    app.use(compression({ threshold: 0 }))

    // Enable CORS
    app.use(cors())

    // Add mongo attribute removal middleware (_id, __v)
    app.use(removeMongoAttributes)

    // Initialize api
    app.use('/buildings', require('buildings/routes.js'))
    app.use('/mythicplus', require('mythicplus/routes.js'))

    // Log all other requests and send 404
    app.use((req, res) => {
        res.status(HttpStatus.NOT_FOUND).json({ message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND) })
    })

    app.listen(config.port, () => { logger.info(`Server is listening on port ${config.port}`) })
}
