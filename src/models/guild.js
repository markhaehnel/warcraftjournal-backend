const mongoose = require('mongoose')

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
    }],
    created: { type: Date, default: Date.now, required: true },
    updated: { type: Date, default: Date.now, required: true }
})

GuildSchema
    .virtual('updateAllowd')
    .get(() => {
        let diffHours = (Math.abs(this.updated - this.created) / 36e5)
        return (diffHours > 1)
    })

mongoose.model('Guild', GuildSchema)
