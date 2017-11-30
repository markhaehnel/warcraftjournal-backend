const router = require('express').Router()
const mythicplusController = require('controllers/mythicplus')

const cache = require('apicache').options({ statusCodes: { include: [200] } }).middleware

router.get('/affixes', cache('60 minutes'), mythicplusController.getAffixes)

module.exports = router
