const router = require('express').Router()
const HttpStatus = require('http-status-codes')
const guildController = require('guilds/guild-controller')

router.get('/guilds', (req, res, next) => res.status(HttpStatus.NOT_IMPLEMENTED).json({ 'message': 'Not implemented yet' }))
router.get('/guilds/:realm/:name', guildController.getGuild)

module.exports = router
