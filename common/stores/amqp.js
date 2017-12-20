let applicationStorage = require('common/stores/application')
const amqp = require('amqplib')

module.exports.start = async () => {
  applicationStorage.amqp = await amqp.connect(applicationStorage.config.amqp)
  applicationStorage.logger.info('AQMP connected')
  return applicationStorage.amqp
}
