const mongoose = require('mongoose')

const Schema = mongoose.Schema

/**
 * Token Schema
 */

const TokenSchema = new Schema({
  price: {},
  lastupdated: { type: Date, default: Date.now, required: true }
})

TokenSchema.methods.isOutdated = function () {
  // older than 30 mins
  return (Math.abs(Date.now() - this.lastupdated) / 60000) > 30
}

mongoose.model('Token', TokenSchema)
