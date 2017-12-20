const Task = require('./_task')
const axios = require('axios')
const RaiderIO = require('common/services/RaiderIO')

const QUEUE = 'MYTHICPLUSAFFIXES_UPDATE'

const MythicPlusAffixes = require('common/models/MythicPlusAffixes')

class WoWTokenUpdateTask extends Task {
  async start () {
    await this.channel.assertQueue(QUEUE)

    let raider = new RaiderIO(axios)

    this.channel.consume(QUEUE, async (msg) => {
      console.log(`AMQP: ${QUEUE}: Message received`)

      let rawMythicPlusAffixes = await raider.getAffixes()

      await MythicPlusAffixes.findOneAndUpdate({}, { affixes: rawMythicPlusAffixes }, { new: true, upsert: true })

      this.channel.ack(msg)
    })
  }
}

module.exports = WoWTokenUpdateTask
