const router = require('express').Router()
const HttpStatus = require('http-status-codes')
const guildController = require('controllers/guild')
const normalizer = require('utils/normalizer')

const realms = require('data/realms.json')
const cache = require('apicache').options({ statusCodes: { include: [200] } }).middleware

function validateRealm (req, res, next) {
  // Realm not found
  if (!realms.find(x => x.slug === req.params.realm)) {
    res.status(HttpStatus.BAD_REQUEST).json({ 'message': 'Realm (slug) not found.' })
  }

  next()
}

function normalizeGuildName ({ params }, res, next) {
  params.name = normalizer.getNormalizedGuildName(params.name)
  next()
}

router.get('/', (req, res, next) => res.status(HttpStatus.NOT_IMPLEMENTED).json({ 'message': 'Not implemented yet' }))
router.get('/:realm/:name', cache('30 minutes'), validateRealm, normalizeGuildName, guildController.getGuild)

module.exports = router
