const Task = require('common/tasks/_Task')
const axios = require('axios')
const MythicPlusAffixes = require('common/models/MythicPlusAffixes')
const RaiderIO = require('common/services/RaiderIO')
const raider = new RaiderIO(axios)

class WoWTokenTask extends Task {
  async run (job, done) {
    try {
      let rawMythicPlusAffixes = await raider.getAffixes()
      await MythicPlusAffixes.findOneAndUpdate({}, { lastupdated: Date.now(), affixes: rawMythicPlusAffixes }, { new: true, upsert: true })
      done()
    } catch (error) {
      done(error)
    }
  }
}

module.exports = WoWTokenTask
