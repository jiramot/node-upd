'use strict'

import mongoose from 'mongoose'
const Schema = mongoose.Schema

const MessageSchema = new Schema({
  message: { type: String }
}, {
  timestamps: { createdAt: 'date_created', updatedAt: 'last_updated' },
  collection: 'message' })

export default mongoose.model('Message', MessageSchema)
