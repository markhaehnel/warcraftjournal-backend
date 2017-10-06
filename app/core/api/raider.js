const axios = require('axios')

const api = axios.create({
  baseURL: 'https://raider.io/api/v1',
  timeout: 5000
})

module.exports.getAffixes = async () => {
  let { data } = await api.get('/mythic-plus/affixes?region=eu')
  return data.affix_details
}
