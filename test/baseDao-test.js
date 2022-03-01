import baseDao from '../src/dao/baseDao.js'
import assert from 'assert'

describe('baseDao', () => {
  after(() => {
    baseDao.close()
  })
  describe('findOne()', () => {
    it('findOne() should return a doc', async () => {
      const doc = await baseDao.findOne(
        'test',
        'fruits',
        { category: '水果' },
        {
          sort: { price: -1 },
          projection: { _id: 0, name: 1, price: 1, category: 1 },
        }
      )
      assert.notStrictEqual(doc, null)
    })
  })
  describe('insertOne()', () => {
    it('insertOne() should return a doc', async () => {
      const res = await baseDao.insertOne('test', 'fruits', {
        category: '水果',
      })
      assert.notStrictEqual(res, null)
    })
  })
})
