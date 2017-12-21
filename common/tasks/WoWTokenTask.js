const Task = require('common/tasks/_Task')
const bnet = require('common/services/BattleNet')
const WoWToken = require('common/models/WoWToken')

class WoWTokenTask extends Task {
  async run (job, done) {
    try {
      let accessToken = await bnet.getAccessToken()
      let wowTokenRes = await bnet.data.token({ access_token: accessToken, origin: 'eu', namespace: 'dynamic-eu' })
      let newToken = new WoWToken({ time: Date.now(), price: wowTokenRes.data.price })
      await newToken.save()
      done()
    } catch (error) {
      done(error)
    }
  }
}
module.exports = WoWTokenTask
