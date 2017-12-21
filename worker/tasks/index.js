const appStorage = require('common/stores/application')
const Queues = require('common/constants/queues')
const WoWTokenTask = require('common/tasks/WoWTokenTask')
const MythicPlusAffixesTask = require('common/tasks/MythicPlusAffixesTask')

async function run () {
  let wowTokenTask = new WoWTokenTask(appStorage.kue, Queues.UPDATE_WOWTOKEN)
  wowTokenTask.listen()

  let mythicPlusAffixesTask = new MythicPlusAffixesTask(appStorage.kue, Queues.UPDATE_MYTHICPLUSAFFIXES)
  mythicPlusAffixesTask.listen()
}

module.exports.run = run
