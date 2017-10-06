const winston = require('winston')
const applicationStorage = require('core/application-storage')

module.exports.start = async () => {
  return new Promise((resolve) => {
    applicationStorage.logger = new (winston.Logger)({
      level: applicationStorage.config.logger.level,
      transports: [new (winston.transports.Console)({ handleExceptions: true })]
    })
    applicationStorage.logger.info('Logger initialized')
    resolve()
  })
}
