const Router = require('express').Router
// const guildRouter = require('./guilds')
const buildingsRouter = require('./buildings')
const notFoundRouter = require('./not-found')

var router = Router()

// router.use(guildRouter)
router.use(buildingsRouter)
router.use(notFoundRouter)

module.exports = router
