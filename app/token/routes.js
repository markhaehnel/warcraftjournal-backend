const router = require('express').Router()
const tokenController = require('token/token-controller')

router.get('/', tokenController.getToken)

module.exports = router
