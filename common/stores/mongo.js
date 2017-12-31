var applicationStorage = require('common/stores/application')
var mongoose = require('mongoose')

mongoose.plugin((schema) => {
  schema.options.toJSON = {
    transform (doc, ret) {
      delete ret._id
      delete ret.__v
    }
  }
})

module.exports.start = async () => {
  applicationStorage.logger.info('MongoDB connecting..')
  applicationStorage.mongo = await mongoose.connect(applicationStorage.config.mongo)
  applicationStorage.logger.info('MongoDB connected')

  return applicationStorage.mongo
}
