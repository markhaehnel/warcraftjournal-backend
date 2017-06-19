const router = require('express').Router()
const buildingsController = require('buildings/buildings-controller')

router.get('/buildings', buildingsController.getBuildings)

module.exports = router
