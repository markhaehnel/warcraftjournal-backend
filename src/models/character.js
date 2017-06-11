import mongoose from 'mongoose'

const Schema = mongoose.Schema

/**
 * Character Schema
 */

const CharacterSchema = new Schema({
    name: { type: String, required: true },
    realm: { type: String, required: true },
    faction: { type: Number, required: true },
    level: { type: Number, required: true },
    class: { type: Number, required: true },
    race: { type: Number, required: true },
    gender: { type: Number, required: true }
})

mongoose.model('Character', CharacterSchema)
