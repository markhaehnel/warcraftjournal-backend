// Module dependencies
const config = require('core/config')
const logger = require('core/logger')
const databases = require('core/databases')
const httpProcess = require('core/http-process')

module.exports = async () => {
  try {
    await config.load()
    await logger.start()
    await databases.startMongo()
    await httpProcess.start()
  } catch (error) {
    console.log(error)
  }
}
