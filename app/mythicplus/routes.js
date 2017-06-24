const router = require('express').Router()
const mythicplusController = require('mythicplus/mythicplus-controller')

router.get('/affixes', mythicplusController.getAffixes)

module.exports = router
