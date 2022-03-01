import BaseDao from '../src/dao/baseDB.js'
import assert from 'assert'

describe('BaseDao', () => {
  const baseDao = new BaseDao()
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
})
