const applicationStorage = require('core/application-storage')
const HttpStatus = require('http-status-codes')
const mongoose = require('mongoose')
const blizzard = require('services/blizzard')

// Initialize schema
require('models/token')

module.exports.getToken = async (req, res, next) => {
  try {
    let Token = mongoose.model('Token')

    let token = await Token.findOne()

    if ((token && token.isOutdated()) || !token) {
      token = await updateToken()
    }

    let result = token.toJSON()

    res.status(HttpStatus.OK).json(result)
  } catch (error) {
    applicationStorage.logger.error(error)
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 'message': error.message })
  }
}

async function updateToken () {
  let Token = mongoose.model('Token')
  let accessToken = await blizzard.getAccessToken()

  let token = (await blizzard.data.token({ access_token: accessToken, origin: 'eu', namespace: 'dynamic-eu' })).data

  let newToken = {
    price: token.price,
    lastupdated: Date.now()
  }

  newToken = await Token.findOneAndUpdate({}, newToken, { new: true, upsert: true })
  applicationStorage.logger.verbose('Updated token.')
  return newToken
}
