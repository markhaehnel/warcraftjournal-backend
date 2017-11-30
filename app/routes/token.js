const router = require('express').Router()
const tokenController = require('controllers/token')

const cache = require('apicache').options({ statusCodes: { include: [200] } }).middleware

router.get('/', cache('10 minutes'), tokenController.getToken)

module.exports = router
