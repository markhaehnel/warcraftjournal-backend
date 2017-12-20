class RaiderService {
  /**
   * Creates an instance of RaiderService.
   * @param {any} axios An axios instance
   * @memberof RaiderService
   */
  constructor (axios) {
    this.axios = axios.create({
      baseURL: 'https://raider.io/api/v1',
      timeout: 5000
    })
  }

  /**
   * Fetches and returns mythic plus affix data
   * @returns {object}
   * @memberof RaiderService
   */
  async getAffixes () {
    let { data } = await this.axios.get('/mythic-plus/affixes?region=eu')
    return data.affix_details
  }
}

module.exports = RaiderService
