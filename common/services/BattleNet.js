const blizzard = require('blizzard.js')

let clientID = process.env.BATTLENET_CLIENTID
let clientSecret = process.env.BATTLENET_CLIENTSECRET

let api = blizzard.initialize({ apikey: clientID, origin: 'eu' })

let clientAccessToken

async function getAccessToken () {
  if (clientAccessToken && !isTokenOutdated(clientAccessToken)) {
    try {
      await api.data.validate({ origin: 'eu', token: clientAccessToken.access_token })
      return clientAccessToken.access_token
    } catch (e) {
      console.log('Access token validation failed.')
    }
  } else {
    console.log('No valid access token.')
  }

  try {
    console.log('Fetching new access token.')
    return await fetchToken()
  } catch (e) {
    console.error('Could not fetch access token. ', e)
  }
}

async function fetchToken () {
  let { data } = await api.data.credentials({ origin: 'eu', id: clientID, secret: clientSecret })
  clientAccessToken = {
    access_token: data.access_token,
    expires: (Date.now() / 1000) + data.expires_in
  }
  return clientAccessToken.access_token
}

function isTokenOutdated (token) {
  // less than 1 day until expiration
  return (token.expires - (Date.now() / 1000)) < 1
}

module.exports = api
module.exports.getAccessToken = getAccessToken
