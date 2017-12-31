const applicationStorage = require('common/stores/application')
const { createLogger, format, transports } = require('winston')

const myFormat = format.printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
})

module.exports.start = async (label) => {
  return new Promise((resolve, reject) => {
    if (!label) throw new Error('No logging label set')

    applicationStorage.logger = createLogger({
      format: format.combine(
        format.label({ label }),
        format.timestamp(),
        myFormat
      ),
      transports: [new transports.Console()]
    })
    applicationStorage.logger.info('Logger initialized')
    resolve()
  })
}
