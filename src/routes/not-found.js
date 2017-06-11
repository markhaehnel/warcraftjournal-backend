import { Router } from 'express'
import HttpStatus from 'http-status-codes'

var router = Router()

router.get('*', function (req, res, next) {
    res.status(HttpStatus.NOT_FOUND).json({ 'message': 'The requested endpoint does not exist.' })
})

export default router
