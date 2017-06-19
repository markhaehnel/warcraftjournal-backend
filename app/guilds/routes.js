const router = require('express').Router()
const HttpStatus = require('http-status-codes')
const guildController = require('guilds/guild-controller')

router.get('/', (req, res, next) => res.status(HttpStatus.NOT_IMPLEMENTED).json({ 'message': 'Not implemented yet' }))
router.get('/:realm/:name', guildController.getGuild)

module.exports = router
