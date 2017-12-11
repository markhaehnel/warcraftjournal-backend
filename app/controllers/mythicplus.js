const applicationStorage = require('core/application-storage')
const HttpStatus = require('http-status-codes')
const mongoose = require('mongoose')
const raider = require('services/raider')

// Initialize schema
require('models/mythicplus')

module.exports.getAffixes = async (req, res, next) => {
  try {
    let Affixes = mongoose.model('MythicPlusAffixes')

    let affixes = await Affixes.findOne()

    if ((affixes && affixes.isOutdated()) || !affixes) {
      affixes = await updateAffixes()
    }

    let result = affixes.toJSON()

    res.status(HttpStatus.OK).json(result)
  } catch (error) {
    applicationStorage.logger.error(error)
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 'message': error.message })
  }
}

async function updateAffixes () {
  let Affixes = mongoose.model('MythicPlusAffixes')

  let rawAffixes = await raider.getAffixes()

  let newAffixes = {
    affixes: rawAffixes,
    lastupdated: Date.now()
  }

  newAffixes = await Affixes.findOneAndUpdate({}, newAffixes, { new: true, upsert: true })
  applicationStorage.logger.verbose('Updated affixes.')
  return newAffixes
}
