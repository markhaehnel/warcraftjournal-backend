const router = require('express').Router()
const tokenController = require('api/controllers/token')

router.get('/', tokenController.getToken)

module.exports = router
