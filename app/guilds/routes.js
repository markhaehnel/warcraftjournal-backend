const router = require('express').Router()
const HttpStatus = require('http-status-codes')
const guildController = require('guilds/guild-controller')
const normalizer = require('utils/normalizer')

const realms = require('data/realms.json')

function validateRealm (req, res, next) {
    // Realm not found
    if (!realms.find(x => x.slug === req.params.realm)) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 'message': 'Realm (slug) not found.' })
    }

    next()
}

function normalizeGuildName ({ params }, res, next) {
    params.name = normalizer.getNormalizedGuildName(params.name)
    next()
}

router.get('/', (req, res, next) => res.status(HttpStatus.NOT_IMPLEMENTED).json({ 'message': 'Not implemented yet' }))
router.get('/:realm/:name', validateRealm, normalizeGuildName, guildController.getGuild)

module.exports = router
