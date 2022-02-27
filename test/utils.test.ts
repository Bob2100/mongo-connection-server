import utils from '../src/utils'
import assert = require('assert')
const { sum, db } = utils

describe('utils', () => {
  describe('getClient()', () => {
    let client = null
    before(async () => {
      client = await db.getClient()
    })
    after(() => {
      if (client) {
        client.close()
      }
    })

    it('getClient() should return a client', async () => {
      assert.notStrictEqual(client, null)
    })
  })
  describe('sum()', () => {
    it('sum() should return 0', () => {
      assert.strictEqual(sum(), 0)
    })

    it('sum(1) should return 1', () => {
      assert.strictEqual(sum(1), 1)
    })

    it('sum(1, 2) should return 3', () => {
      assert.strictEqual(sum(1, 2), 3)
    })

    it('sum(1, 2, 3) should return 6', () => {
      assert.strictEqual(sum(1, 2, 3), 6)
    })
  })
})
