const router = require('express').Router()
const tokenController = require('controllers/token')

router.get('/', tokenController.getToken)

module.exports = router
