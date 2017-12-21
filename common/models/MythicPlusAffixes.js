const mongoose = require('mongoose')
const Schema = mongoose.Schema

let MythicPlusAffixSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  wowhead_url: { type: String, required: true }
}, { _id: false })

const MythicPlusAffixesSchema = new Schema({
  affixes: [MythicPlusAffixSchema],
  lastupdated: { type: Date, default: Date.now, required: true }
})

module.exports = mongoose.model('MythicPlusAffixes', MythicPlusAffixesSchema)
