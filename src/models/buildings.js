const mongoose = require('mongoose')

const Schema = mongoose.Schema

/**
 * Building Schema
 */

const BuildingSchema = new Schema({
    state: { type: Number, required: true },
    contributed: { type: Number, required: true },
    contributedHours: { type: Number, required: true },
    buff1: { type: Number, required: true },
    buff2: { type: Number, required: true }
})

/**
 * Buildings Schema
 */

const BuildingsSchema = new Schema({
    magetower: BuildingSchema,
    commandcenter: BuildingSchema,
    netherdisruptor: BuildingSchema,
    lastupdated: { type: Date, required: true }
})

BuildingsSchema.methods.isOutdated = function () {
    return (Math.abs(Date.now() - this.lastupdated) % 36e5 / 60000) > 10
}

mongoose.model('Buildings', BuildingsSchema)
