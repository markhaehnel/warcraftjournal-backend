const router = require('express').Router()
const mythicplusController = require('api/controllers/mythicplus')

router.get('/affixes', mythicplusController.getAffixes)

module.exports = router
