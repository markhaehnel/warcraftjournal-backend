const Router = require('express').Router
const HttpStatus = require('http-status-codes')

const router = Router()

router.get('*', function (req, res, next) {
    res.status(HttpStatus.NOT_FOUND).json({ 'message': 'The requested endpoint does not exist.' })
})

module.exports = router
