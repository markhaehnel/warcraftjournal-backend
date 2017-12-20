const applicationStorage = require('common/stores/application')
const HttpStatus = require('http-status-codes')
const blizzard = require('common/services/BattleNet')
const Guild = require('common/models/Guild')

module.exports.getGuild = async ({ params }, res, next) => {
  try {
    let guild = await Guild.findOne({ realm: params.realm, nameNormalized: params.name })

    if ((guild && guild.isOutdated()) || !guild) {
      guild = await updateGuild(params.realm, params.name)
    }

    let result = guild.toJSON()

    res.status(HttpStatus.OK).json(result)
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 'message': err.message })
  }
}

async function updateGuild (realm, name) {
  let rawGuild = (await blizzard.wow.guild(['members'], { origin: 'eu', realm: realm, name: name })).data

  let members = []

  rawGuild.members.forEach((rawMember) => {
    members.push({
      name: rawMember.character.name,
      realm: rawMember.character.realm
    })
  })

  let newGuild = {
    name: rawGuild.name,
    nameNormalized: name,
    realm: realm,
    side: rawGuild.side,
    members: members,
    lastupdated: Date.now()
  }

  newGuild = await Guild.findOneAndUpdate({}, newGuild, { new: true, upsert: true })
  applicationStorage.logger.verbose(`Updated guild ${realm}-${name}.`)
  return newGuild
}
