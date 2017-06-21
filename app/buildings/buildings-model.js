const mongoose = require('mongoose')

const Schema = mongoose.Schema

/**
 * Building Schema
 */

const BuffSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    icon: { type: String, required: true },
    description: { type: String, required: true }
}, { _id: false })

/**
 * Building Schema
 */

const BuildingSchema = new Schema({
    state: { type: Number, required: true },
    contributed: { type: Number, required: true },
    contributed_hours: { type: Number, required: true },
    buff1: BuffSchema,
    buff2: BuffSchema
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

BuildingsSchema.methods.isOutdated = function () {
    return (Math.abs(Date.now() - this.lastupdated) / 36e5) > 0.1
}

mongoose.model('Buildings', BuildingsSchema)
