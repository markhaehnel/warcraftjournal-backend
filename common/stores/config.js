const config = Object.freeze({
  port: process.env.PORT || 3000,
  mongo: process.env.MONGODB || 'mongodb://localhost/warcraftjournal',
  redis: process.env.REDIS || 'redis://localhost',
  logger: {
    folder: 'logs',
    level: 'debug'
  },
  battlenet: {
    clientID: process.env.BATTLENET_CLIENTID,
    clientSecret: process.env.BATTLENET_CLIENTSECRET
  }
})

module.exports.load = async () => {
  return new Promise((resolve) => {
    var applicationStorage = require(`common/stores/application`)
    applicationStorage.config = config
    resolve()
  })
}
