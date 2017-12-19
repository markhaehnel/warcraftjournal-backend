const applicationStorage = require('core/application-storage')
const HttpStatus = require('http-status-codes')
const Token = require('common/models/WoWToken')

module.exports.getToken = async (req, res, next) => {
  try {
    let token = await Token.findOne().sort({ time: -1 })
    res.status(HttpStatus.OK).json(token.toJSON())
  } catch (error) {
    applicationStorage.logger.error(error)
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 'message': error.message })
  }
}
