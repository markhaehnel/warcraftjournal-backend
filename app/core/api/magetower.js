const axios = require('axios')

const api = axios.create({
    baseURL: 'https://data.magetower.info',
    timeout: 5000
})

module.exports.getBuildings = async () => {
    let { data } = await api.get('/magetower.json')
    return data.update.EU
}
