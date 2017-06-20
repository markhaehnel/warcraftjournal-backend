const mongoose = require('mongoose')

const Schema = mongoose.Schema

/**
 * Building Schema
 */

const BuildingSchema = new Schema({
    state: { type: Number, required: true },
    contributed: { type: Number, required: true },
    contributed_hours: { type: Number, required: true },
    buff1: { type: Number, required: true },
    buff2: { type: Number, required: true }
}, { _id: false })

/**
 * Buildings Schema
 */

const BuildingsSchema = new Schema({
    magetower: BuildingSchema,
    commandcenter: BuildingSchema,
    netherdisruptor: BuildingSchema,
    lastupdated: { type: Date, required: true }
})

BuildingsSchema.methods.isOutdated = () => {
    return (Math.abs(Date.now() - this.lastupdated) / 36e5) > 0.1
}

mongoose.model('Buildings', BuildingsSchema)
