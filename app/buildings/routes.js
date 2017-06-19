const router = require('express').Router()
const buildingsController = require('buildings/buildings-controller')

router.get('/', buildingsController.getBuildings)

module.exports = router
