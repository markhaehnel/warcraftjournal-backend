const blizzard = require('blizzard.js')
const { config } = require('core/application-storage')

module.exports = blizzard.initialize({ apikey: config.battlenet.clientID })
