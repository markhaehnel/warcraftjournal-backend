const blizzard = require('blizzard.js')
const applicationStorage = require('core/application-storage')

let bnetConfig = applicationStorage.config.battlenet
let api = blizzard.initialize({ apikey: bnetConfig.clientID, origin: 'eu' })

module.exports = api

module.exports.getAccessToken = async function () {
  if (bnetConfig.clientAccessToken && !isTokenOutdated(bnetConfig.clientAccessToken)) {
    try {
      await api.data.validate({ origin: 'eu', token: bnetConfig.clientAccessToken.access_token })
      return bnetConfig.clientAccessToken.access_token
    } catch (e) {
      applicationStorage.logger.info('Access token validation failed.')
    }
  } else {
    applicationStorage.logger.info('No valid access token.')
  }

  try {
    applicationStorage.logger.info('Fetching new access token.')
    let { data } = await api.data.credentials({ origin: 'eu', id: bnetConfig.clientID, secret: bnetConfig.clientSecret })
    bnetConfig.clientAccessToken = {
      access_token: data.access_token,
      expires: (Date.now() / 1000) + data.expires_in
    }
    return bnetConfig.clientAccessToken.access_token
  } catch (e) {
    applicationStorage.logger.error('Could not fetch acces token. ', e)
  }

  throw new Error('Internal server error')
}

function isTokenOutdated (token) {
  // less than 1 day until expiration
  return (token.expires - (Date.now() / 1000)) < 1
}
