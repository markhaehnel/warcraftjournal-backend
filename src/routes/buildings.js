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

    let raw = await axios.get('https://data.magetower.info/magetower.json')
    let rawBuildings = raw.data.update.EU

    let magetower = {
        state: rawBuildings['1'].state,
        contributed: rawBuildings['1'].contributed,
        contributedHours: rawBuildings['1'].contributed_hours,
        buff1: rawBuildings['1'].buff1,
        buff2: rawBuildings['1'].buff2
    }

    let commandcenter = {
        state: rawBuildings['3'].state,
        contributed: rawBuildings['3'].contributed,
        contributedHours: rawBuildings['3'].contributed_hours,
        buff1: rawBuildings['3'].buff1,
        buff2: rawBuildings['3'].buff2
    }

    let netherdisruptor = {
        state: rawBuildings['4'].state,
        contributed: rawBuildings['4'].contributed,
        contributedHours: rawBuildings['4'].contributed_hours,
        buff1: rawBuildings['4'].buff1,
        buff2: rawBuildings['4'].buff2
    }

    let newBuildings = {
        magetower,
        commandcenter,
        netherdisruptor,
        lastupdated: Date.now()
    }

    newBuildings = await Buildings.findOneAndUpdate({}, newBuildings, { new: true, upsert: true })
    return newBuildings
}

module.exports = router
