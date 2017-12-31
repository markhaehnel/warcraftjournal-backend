const applicationStorage = require('common/stores/application')
const { createLogger, format, transports } = require('winston')

const myFormat = format.printf(info => {
  return `${info.timestamp} [${info.level}][${info.label}] ${info.message}`
})

module.exports.start = async (label) => {
  return new Promise((resolve, reject) => {
    if (!label) throw new Error('No logging label set')

    applicationStorage.logger = createLogger({
      format: format.combine(
        format.timestamp(),
        format.label({ label }),
        format.colorize(),
        myFormat
      ),
      transports: [new transports.Console({ level: process.env.LOGLEVEL || 'info' })]
    })
    applicationStorage.logger.info('Logger initialized')
    resolve()
  })
}
