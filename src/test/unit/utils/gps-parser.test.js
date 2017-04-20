/* eslint-env mocha */

'use strict'

import * as parser from '~/app/utils/gps-parser.js'
import assert from 'assert'

const message = '358901049754804|170411063349.80|1A|NULL|0.052|0.98|1340.75488|10031.61590|15|G27,G16,S40,G23,G26,G09,G03,S41,G08,G07,B07,B02,B14,B10,B05'

describe('gps-parser', () => {
  describe('parse', () => {
    it('should parse imie', () => {
      let expected = '358901049754804'

      let data = parser.parse(message)
      let actual = data.imei

      assert.equal(actual, expected)
    })

    it('should parse date', () => {
      let expected = new Date(Date.UTC(2011, 4, 17, 6, 33, 49, 80))

      let data = parser.parse(message)
      let actual = data.date

      assert.equal(actual.getTime(), expected.getTime())
    })

    it('should parse type', () => {
      let expected = '1A'

      let data = parser.parse(message)
      let actual = data.type

      assert.equal(actual, expected)
    })

    it('should parse anger', () => {
      let expected = null

      let data = parser.parse(message)
      let actual = data.angle

      assert.equal(actual, expected)
    })

    it('should parse speed', () => {
      let expected = 0.052

      let data = parser.parse(message)
      let actual = data.speed

      assert.equal(actual, expected)
    })

    it('should parse hdop', () => {
      let expected = 0.98

      let data = parser.parse(message)
      let actual = data.hdop

      assert.equal(actual, expected)
    })

    it('should parse coord', () => {
      let expected = { lng: 100.526931666666667, lat: 13.679248 }

      let data = parser.parse(message)
      let actual = data.coord

      assert.equal(parseFloat(actual.lng).toFixed(5), parseFloat(expected.lng).toFixed(5))
      assert.equal(parseFloat(actual.lat).toFixed(5), parseFloat(expected.lat).toFixed(5))
    })

    it('should parse sats', () => {
      let expected = 15

      let data = parser.parse(message)
      let actual = data.sats

      assert.equal(actual, expected)
    })

    it('should parse sat prn', () => {
      let expected = 'G27,G16,S40,G23,G26,G09,G03,S41,G08,G07,B07,B02,B14,B10,B05'

      let data = parser.parse(message)
      let actual = data.satprn

      assert.equal(actual, expected)
    })
  })

  describe('parseDate', () => {
    it('should parse date', () => {
      let expected = new Date(Date.UTC(2011, 4, 17, 6, 33, 49, 80))

      let actual = parser.parseDate('170411063349.80')

      assert.equal(actual.getTime(), expected.getTime())
    })
  })

  describe('parseNmeaToDecimal', () => {
    it('should parse 1340.7542 to decimal', () => {
      let expect = 13.6792377

      let actual = parser.parseNmeaToDecimal(1340.7542)

      assert.equal(parseFloat(actual).toFixed(5), parseFloat(expect).toFixed(5))
    })

    it('should parse 10031.61802 to decimal', () => {
      let expect = 100.526967

      let actual = parser.parseNmeaToDecimal(10031.61802)

      assert.equal(parseFloat(actual).toFixed(5), parseFloat(expect).toFixed(5))
    })

    it('should return null when parse null', () => {
      let expect = null

      let actual = parser.parseNmeaToDecimal(null)

      assert.equal(actual, expect)
    })
  })
})
