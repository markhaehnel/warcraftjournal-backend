const Router = require('express').Router
const HttpStatus = require('http-status-codes')
const mongoose = require('mongoose')
const axios = require('axios')

const router = Router()

router.get('/buildings', async (req, res, next) => {
    try {
        let Buildings = mongoose.model('Buildings')

        let buildings = await Buildings.findOne()

        if ((buildings && buildings.isOutdated()) || !buildings) {
            buildings = await updateBuildings()
        }

        res.status(HttpStatus.OK).json(buildings)
    } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 'message': err.message })
    }
})

async function updateBuildings () {
    let Buildings = mongoose.model('Buildings')

    let { data } = await axios.get('https://data.magetower.info/magetower.json')

    let newBuildings = {
        magetower: createBuildingObject(data.rawBuildings['1']),
        commandcenter: createBuildingObject(data.rawBuildings['3']),
        netherdisruptor: createBuildingObject(data.rawBuildings['4']),
        lastupdated: Date.now()
    }

    newBuildings = await Buildings.findOneAndUpdate({}, newBuildings, { new: true, upsert: true })
    return newBuildings
}

function createBuildingObject (params) {
    return {
        state: params.state,
        contributed: params.contributed,
        contributedHours: params.contributed_hours,
        buff1: params.buff1,
        buff2: params.buff2
    }
}

module.exports = router
