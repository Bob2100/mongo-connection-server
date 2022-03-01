import baseDao from '../src/dao/baseDao.js'
import assert from 'assert'

describe('baseDao', () => {
  after(() => {
    baseDao.close()
  })
  describe('findOne()', () => {
    let insertRes = null
    before(async () => {
      insertRes = await baseDao.insertOne('test', 'fruits', {
        category: '水果',
      })
    })
    it('findOne() should return a doc', async () => {
      console.log(typeof insertRes.insertedId)
      const doc = await baseDao.findOne('test', 'fruits', {
        _id: insertRes.insertedId,
      })
      assert.notStrictEqual(doc, null)
    })
  })
})
