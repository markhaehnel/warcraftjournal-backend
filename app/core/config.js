var applicationStorage = require('core/application-storage')

module.exports.load = async () => {
    return new Promise((resolve) => {
        require('dotenv').config()

        applicationStorage.env = process.env.NODE_ENV || 'development'

        if (applicationStorage.env === 'development') {
            applicationStorage.config = require(`config/config.${applicationStorage.env}.js`)
        } else {
            applicationStorage.config = require('config/config.js')
        }

        resolve()
    })
}
