const mongoose = require('mongoose')

const Schema = mongoose.Schema

/**
 * Mythic Plus Affix Schema
 */

let MythicPlusAffixSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  wowhead_url: { type: String, required: true }
}, { _id: false })

/**
 * Mythic Plus Affixes Schema
 */

const MythicPlusAffixesSchema = new Schema({
  affixes: [MythicPlusAffixSchema],
  lastupdated: { type: Date, required: true }
})

MythicPlusAffixesSchema.methods.isOutdated = function () {
  // older than 1 hour
  return (Math.abs(Date.now() - this.lastupdated) / 36e5) > 1
}

mongoose.model('MythicPlusAffixes', MythicPlusAffixesSchema)
