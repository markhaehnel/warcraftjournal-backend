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
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise

    applicationStorage.mongo = mongoose.connect(applicationStorage.config.mongo).connection
            .once('open', () => {
              applicationStorage.logger.info('MongoDB connected')
              resolve()
            })
  })
}
