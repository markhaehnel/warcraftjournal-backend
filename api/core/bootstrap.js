// Module dependencies
const config = require('common/stores/config')
const logger = require('common/utils/logger')
const mongo = require('common/stores/mongo')
const httpProcess = require('api/core/http-process')

module.exports = async () => {
  try {
    await config.load()
    await logger.start()
    await mongo.start()
    await httpProcess.start()
  } catch (error) {
    console.log(error)
  }
}
