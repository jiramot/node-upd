'use strict'

import * as parser from '~/app/utils/gps-parser'
import Gps from '~/app/models/gps'
import logger from '~/config/logger'

export const onReceive = async (message) => {
  let messages = message.toString('UTF-8')
  logger.debug('onReceive ' + messages)
  messages = messages.split('$')
  logger.debug('onReceive after split' + messages)
  let promises = []
  for (let m of messages) {
    if (m) {
      let data = parser.parse(m)
      promises.push(new Gps(data).save())
    }
  }
  await Promise.all(promises)
}
