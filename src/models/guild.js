import mongoose from 'mongoose'

const Schema = mongoose.Schema

/**
 * Guild Schema
 */

const GuildSchema = new Schema({
    name: { type: String, required: true },
    realm: { type: String, required: true },
    side: { type: Number, required: true },
    members: [{
        name: { type: String, required: true },
        realm: { type: String, required: true }
    }]
})

mongoose.model('Guild', GuildSchema)
