'use strict'

import mongoose from 'mongoose'
const Schema = mongoose.Schema

const GpsSchema = new Schema({
  imei: { type: String },
  date: { type: Date },
  type: { type: String },
  angle: { type: Number },
  speed: { type: Number },
  lat: { type: Number },
  hdop: { type: Number },
  coord: { lng: Number, lat: Number },
  sats: { type: Number },
  satprn: { type: String }
}, {
  timestamps: true,
  collection: 'gps' })

export default mongoose.model('Gps', GpsSchema)
