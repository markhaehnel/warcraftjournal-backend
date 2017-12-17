const router = require('express').Router()
const mythicplusController = require('controllers/mythicplus')

router.get('/affixes', mythicplusController.getAffixes)

module.exports = router
