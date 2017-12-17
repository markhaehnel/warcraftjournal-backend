const applicationStorage = require('core/application-storage')
const HttpStatus = require('http-status-codes')
const Affixes = require('common/models/mythicplus')

module.exports.getAffixes = async (req, res, next) => {
  try {
    let affixes = await Affixes.findOne()
    res.status(HttpStatus.OK).json(affixes.toJSON())
  } catch (error) {
    applicationStorage.logger.error(error)
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 'message': error.message })
  }
}
