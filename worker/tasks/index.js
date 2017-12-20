const applicationStorage = require('common/stores/application')
const WoWTokenUpdateTask = require('worker/tasks/WoWTokenUpdateTask')
const MythicPlusAffixesUpdateTask = require('worker/tasks/MythicPlusAffixesUpdateTask')

async function run () {
  let channel = await applicationStorage.amqp.createChannel()
  applicationStorage.logger.info('AMQP Channel created/joined')

  channel.prefetch(1)

  let wowTokenUpdateTask = new WoWTokenUpdateTask(channel)
  applicationStorage.logger.info('Listening for WoWTokenUpdateTask')
  wowTokenUpdateTask.start()

  let mythicPlusAffixesUpdateTask = new MythicPlusAffixesUpdateTask(channel)
  applicationStorage.logger.info('Listening for MythicPlusAffixesUpdateTask')
  mythicPlusAffixesUpdateTask.start()
}

module.exports.run = run
