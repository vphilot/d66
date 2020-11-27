// Dependencies
const mongoose = require('mongoose')

// Constants
const { Schema } = mongoose

// Schemas
const EntrySchema = new Schema({
  date: Date,
  state: String,
})

module.exports = EntrySchema
