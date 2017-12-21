// Module dependencies
const config = require('common/stores/config')
const logger = require('common/utils/logger')
const kue = require('common/stores/kue')
const mongo = require('common/stores/mongo')
const tasks = require('worker/tasks')

module.exports = async () => {
  try {
    await config.load()
    await logger.start()
    await mongo.start()
    await kue.start()
    await tasks.run()
  } catch (error) {
    console.log(error)
  }
}
