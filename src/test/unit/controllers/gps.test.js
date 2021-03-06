/* eslint-env mocha */

'use strict'

import * as controller from '~/app/controllers/gps'
import assert from 'assert'

const messages = '$358901049754804|170411112334.20|1A|NULL|0.052|1.20|1340.75417|10031.61855|15|G01,G17,S41,S40,G28,G30,G11,G19,B07,B13,B05,B08,B11,B10,B02\n$358901049754804|170411112334.40|1A|NULL|0.091|1.43|1340.75417|10031.61855|14|G01,G17,S41,S40,G28,G30,G11,G19,B13,B05,B08,B11,B10,B02\n$358901049754804|170411112334.60|1A|NULL|0.037|1.43|1340.75417|10031.61855|14|G01,G17,S41,S40,G28,G30,G11,G19,B13,B05,B08,B11,B10,B02\n$358901049754804|170411112334.80|1A|NULL|0.206|1.43|1340.75418|10031.61855|14|G01,G17,S41,S40,G28,G30,G11,G19,B13,B05,B08,B11,B10,B02\n$358901049754804|170411112335.00|1A|NULL|0.085|1.43|1340.75418|10031.61855|14|G01,G17,S41,S40,G28,G30,G11,G19,B13,B05,B08,B11,B10,B02\n'
describe('gps-parser', () => {
  it('should parse messages', () => {
    let datas = controller.onReceive(messages)

    assert.equal(datas[0].imei, 358901049754804)
    assert.equal(datas[0].speed, 0.052)
    assert.equal(datas[1].speed, 0.091)
  })
})
