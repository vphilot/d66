// Dependencies
const mongoose = require('mongoose')

// Constants
const { Schema } = mongoose

// Schemas
const EntrySchema = new Schema({
  date: Date,
  state: {
    type: String,
    default: '',
  },
})

module.exports = EntrySchema
