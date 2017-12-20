const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TokenSchema = new Schema({
  price: { type: Number, required: true },
  time: { type: Date, default: Date.now, required: true }
})

module.exports = mongoose.model('WoWToken', TokenSchema)
