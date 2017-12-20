// Module dependencies
const config = require('common/stores/config')
const logger = require('common/utils/logger')
const amqp = require('common/stores/amqp')
const mongo = require('common/stores/mongo')
const tasks = require('worker/tasks')

module.exports = async () => {
  try {
    await config.load()
    await logger.start()
    await amqp.start()
    await mongo.start()
    await tasks.run()
  } catch (error) {
    console.log(error)
  }
}
