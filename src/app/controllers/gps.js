'use strict'

import * as parser from '~/app/utils/gps-parser'
import Gps from '~/app/models/gps'

export const onReceive = async (message) => {
  let messages = message.toString('UTF-8')
  messages = messages.split('$')
  let promises = []
  for (let m of messages) {
    if (m) {
      let data = parser.parse(m)
      promises.push(new Gps(data).save())
    }
  }
  await Promise.all(promises)
}
