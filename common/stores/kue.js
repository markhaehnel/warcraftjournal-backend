let applicationStorage = require('common/stores/application')
const kue = require('kue')

module.exports.start = async () => {
  applicationStorage.kue = await kue.createQueue({ redis: applicationStorage.config.redis })
  applicationStorage.logger.info('Kue connected')
  return applicationStorage.kue
}
