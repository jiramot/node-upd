'use strict'

import fs from 'fs'
import path from 'path'
import dgram from 'dgram'
import config from '~/config/config'
import mongoose from 'mongoose'
import mockgoose from 'mockgoose'
import logger from '~/config/logger'

const join = path.join
const models = join(__dirname, 'app/models')
const server = dgram.createSocket('udp4')
const port = process.env.PORT || 3000

import Message from '~/app/models/message'

mongoose.Promise = global.Promise

fs.readdirSync(models)
  .filter(file => ~file.indexOf('.js'))
  .forEach(file => require(join(models, file)))

if (process.env.NODE_ENV === 'test') {
  mockgoose(mongoose)
    .then(() => mongoose.connect(config.db))
  listen()
} else {
  connect()
    .on('error', logger.error)
    .on('disconnected', connect)
    .once('open', listen)
}

function listen () {
  server.bind(3000)
  logger.info('Express app started on port ' + port)
}

function connect () {
  return mongoose.connect(config.db.uri, config.db.options).connection
}

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`)
  server.close()
})

server.on('message', async (msg, rinfo) => {
  await new Message({message: msg}).save()
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`)
})

server.on('listening', () => {
  var address = server.address()
  console.log(`server listening ${address.address}:${address.port}`)
})
