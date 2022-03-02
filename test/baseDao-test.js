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
    after(() => {
      baseDao.deleteOne('test', 'fruits', { _id: insertRes.insertedId })
    })
    it('findOne() should return a doc', async () => {
      const doc = await baseDao.findOne('test', 'fruits', {
        _id: insertRes.insertedId,
      })
      assert.notStrictEqual(doc, null)
    })
  })
  describe('insertOne()', () => {
    let insertRes = null
    after(() => {
      baseDao.deleteOne('test', 'fruits', { _id: insertRes.insertedId })
    })
    it('insertOne() should return a doc with insertedId', async () => {
      insertRes = await baseDao.insertOne('test', 'fruits', {
        category: '水果',
      })
      assert.notStrictEqual(insertRes.insertedId, null)
    })
  })
  describe('deleteOne()', () => {
    let insertRes = null
    before(async () => {
      insertRes = await baseDao.insertOne('test', 'fruits', {
        category: '水果',
      })
    })
    it('deleteOne() should return a doc with deletedCount 1', async () => {
      const res = await baseDao.deleteOne('test', 'fruits', {
        _id: insertRes.insertedId,
      })
      assert.strictEqual(res.deletedCount, 1)
    })
  })
})
