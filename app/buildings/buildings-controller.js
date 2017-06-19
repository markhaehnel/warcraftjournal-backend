const applicationStorage = require('core/application-storage')
const HttpStatus = require('http-status-codes')
const mongoose = require('mongoose')
const magetower = require('core/api/magetower')

// Initialize buildings schema
require('buildings/buildings-model')

module.exports.getBuildings = async (req, res, next) => {
    try {
        let Buildings = mongoose.model('Buildings')

        let buildings = await Buildings.findOne()

        if ((buildings && buildings.isOutdated()) || !buildings) {
            buildings = await updateBuildings()
        }

        let result = buildings.toJSON()

        res.status(HttpStatus.OK).json(result)
    } catch (error) {
        applicationStorage.logger.error(error)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 'message': error.message })
    }
}

async function updateBuildings () {
    let Buildings = mongoose.model('Buildings')

    let rawBuildings = await magetower.getBuildings()

    let newBuildings = {
        magetower: rawBuildings['1'],
        commandcenter: rawBuildings['3'],
        netherdisruptor: rawBuildings['4'],
        lastupdated: Date.now()
    }

    newBuildings = await Buildings.findOneAndUpdate({}, newBuildings, { new: true, upsert: true })
    applicationStorage.logger.verbose('Updated buildings.')
    return newBuildings
}
