const blizzard = require('blizzard.js')
const applicationStorage = require('core/application-storage')

let bnetConfig = applicationStorage.config.battlenet
let api = blizzard.initialize({ apikey: bnetConfig.clientID, origin: 'eu' })

module.exports = api
