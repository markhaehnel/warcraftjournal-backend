var applicationStorage = require('core/application-storage')
var mongoose = require('mongoose')

module.exports.start = () => { this.startMongo() }

module.exports.startMongo = async () => {
    return new Promise((resolve, reject) => {
        mongoose.Promise = global.Promise

        applicationStorage.mongo = mongoose.connect(applicationStorage.config.database.mongo).connection
            .once('open', () => {
                applicationStorage.logger.info('MongoDB connected')
                resolve()
            })
    })
}
