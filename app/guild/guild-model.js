const mongoose = require('mongoose')

const Schema = mongoose.Schema

/**
 * Guild Schema
 */

const GuildSchema = new Schema({
    name: { type: String, required: true },
    nameNormalized: { type: String, required: true },
    realm: { type: String, required: true },
    side: { type: Number, required: true },
    members: [{
        name: { type: String, required: true },
        realm: { type: String, required: true }
    }],
    created: { type: Date, default: Date.now, required: true },
    lastupdated: { type: Date, default: Date.now, required: true }
})

GuildSchema.methods.isOutdated = function () {
    return (Math.abs(Date.now() - this.lastupdated) / 36e5) > 1
}

mongoose.model('Guild', GuildSchema)
