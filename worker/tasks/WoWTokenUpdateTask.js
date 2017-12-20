const Task = require('./_task')
const battleNet = require('common/services/BattleNet')

const QUEUE = 'TOKEN_UPDATE'

const WoWToken = require('common/models/WoWToken')

class WoWTokenUpdateTask extends Task {
  async start () {
    let channel = this.channel
    await this.channel.assertQueue(QUEUE)

    await channel.consume(QUEUE, async (msg) => {
      console.log(`AMQP: ${QUEUE}: Message received`)
      let accessToken = await battleNet.getAccessToken()

      let wowTokenRes = await battleNet.data.token({ access_token: accessToken, origin: 'eu', namespace: 'dynamic-eu' })

      let newToken = new WoWToken({ price: wowTokenRes.data.price })
      await newToken.save()

      channel.ack(msg)
    })
  }
}

module.exports = WoWTokenUpdateTask
