const applicationStorage = require('common/stores/application')
const HttpStatus = require('http-status-codes')
const Affixes = require('common/models/MythicPlusAffixes')

module.exports.getAffixes = async (req, res, next) => {
  try {
    let affixes = await Affixes.findOne()
    res.status(HttpStatus.OK).json(affixes.toJSON())
  } catch (error) {
    applicationStorage.logger.error(error)
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 'message': error.message })
  }
}
