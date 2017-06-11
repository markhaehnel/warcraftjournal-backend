import blizz from 'blizzard.js'

const blizzard = blizz.initialize({
    apikey: process.env.BATTLENET_API_KEY
})

export default blizzard
