const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
  // older than 30 minutes
  return (Math.abs(Date.now() - this.lastupdated) / 60000) > 30
}

module.exports = mongoose.model('Guild', GuildSchema)
