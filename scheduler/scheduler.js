const path = require('path')
require('app-module-path').addPath(path.join(__dirname, '..'))

const logger = require('common/utils/logger')
const config = require('common/stores/config')
const schedule = require('node-schedule')
const kue = require('common/stores/kue')
const Queues = require('common/constants/queues')

const WoWTokenTask = require('common/tasks/WoWTokenTask')
const MythicPlusAffixesTask = require('common/tasks/MythicPlusAffixesTask')

const EVERY_30MINS = '*/30 * * * *'
const EVERY_HOUR = '0 * * * *'

async function run () {
  await config.load()
  await logger.start('scheduler')

  let queue = await kue.start()

  let wowTokenTask = new WoWTokenTask(queue, Queues.UPDATE_WOWTOKEN)
  let mythicPlusAffixesTask = new MythicPlusAffixesTask(queue, Queues.UPDATE_MYTHICPLUSAFFIXES)

  schedule.scheduleJob(EVERY_30MINS, wowTokenTask.enqueue.bind(wowTokenTask))
  schedule.scheduleJob(EVERY_HOUR, mythicPlusAffixesTask.enqueue.bind(mythicPlusAffixesTask))
}

run()
