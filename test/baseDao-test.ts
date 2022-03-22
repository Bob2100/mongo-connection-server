import baseDao from '../src/dao/baseDao.js'
import * as assert from 'assert'
import {
  ChangeStream,
  FindOneAndUpdateOptions,
  FindOptions,
  ObjectId,
} from 'mongodb'

interface Fruits {
  _id?: ObjectId
  name: string
  price?: number
  category?: string
}

describe('baseDao', () => {
  after(() => {
    baseDao.close()
  })
  describe('watch()', () => {
    const dbName = 'test'
    let changeStream: ChangeStream = null
    after(() => {
      changeStream.close()
    })
    it('watch() should not return null', async () => {
      changeStream = await baseDao.watch(dbName)
      assert.notStrictEqual(changeStream, null)
    })
  })
  describe('distinct()', () => {
    const dbName = 'test'
    const command = {
      dbStats: 1,
    }
    it('distinct() should return a array', async () => {
      const res = await baseDao.command(dbName, command)
      assert.notStrictEqual(res, null)
    })
  })
  describe('distinct()', () => {
    const dbName = 'test'
    const colName = 'fruits'
    it('distinct() should return a array', async () => {
      const res = await baseDao.distinct(dbName, colName, 'category')
      assert.notStrictEqual(res, null)
    })
  })
  describe('countDocuments()', () => {
    const dbName = 'test'
    const colName = 'fruits'
    it('countDocuments() should return a number', async () => {
      const res = await baseDao.countDocuments(dbName, colName)
      assert.notStrictEqual(res, 0)
    })
  })
  describe('drop()', () => {
    const dbName = 'test'
    const colName = '_fruits'
    before(async () => {
      await baseDao.insertOne(dbName, colName, {
        category: '水果',
      })
    })
    it('drop() should return true', async () => {
      const res = await baseDao.drop(dbName, colName)
      assert.strictEqual(res, true)
    })
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
  describe('find()', () => {
    let insertRes = null
    before(async () => {
      const docs: Fruits[] = [
        {
          name: '火龙果',
          category: '水果',
          price: 1000,
        },
        {
          name: '龙眼',
          category: '水果',
          price: 800,
        },
      ]
      insertRes = await baseDao.insertMany('test', 'fruits', docs)
    })
    after(() => {
      baseDao.deleteMany('test', 'fruits', {
        _id: { $in: Object.values(insertRes.insertedIds) },
      })
    })
    it('find() should return 2 docs', async () => {
      const query = { price: { $gt: 500 } }
      const options: FindOptions = {
        sort: { price: 1 },
        projection: { _id: 0, name: 1, price: 1 },
      }
      const docs = await baseDao.find('test', 'fruits', query, options)
      assert.strictEqual(docs.length, 2)
    })
  })
  describe('insertOne()', () => {
    let insertRes = null
    after(() => {
      baseDao.deleteMany('test', 'fruits', {
        _id: insertRes.insertedId,
      })
    })
    it('insertOne() should return a doc with insertedId', async () => {
      const doc = {
        name: '_葡萄',
        price: 10,
        category: '水果',
      }
      insertRes = await baseDao.insertOne('test', 'fruits', doc)
      assert.notStrictEqual(insertRes.insertedId, null)
    })
  })
  describe('insertMany()', () => {
    let insertRes = null
    after(() => {
      baseDao.deleteMany('test', 'fruits', {
        _id: { $in: Object.values(insertRes.insertedIds) },
      })
    })
    it('insertMany() should return a doc with right insertedCount', async () => {
      const docs = [
        {
          name: '_葡萄',
          price: 10,
          category: '水果',
        },
        {
          name: '_白菜',
          price: 5,
          category: '蔬菜',
        },
        {
          name: '_黄瓜',
          price: 5,
          category: '蔬菜',
        },
        {
          name: '_西红柿',
          price: 5,
          category: '蔬菜',
        },
      ]
      insertRes = await baseDao.insertMany('test', 'fruits', docs)
      assert.strictEqual(insertRes.insertedCount, docs.length)
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
  describe('deleteMany()', () => {
    let insertRes = null
    before(async () => {
      const docs = [
        {
          name: '_葡萄1',
          category: '水果',
        },
        {
          name: '_白菜',
          category: '蔬菜',
        },
      ]
      insertRes = await baseDao.insertMany('test', 'fruits', docs)
    })
    it('deleteMany() should return a doc with right deletedCount ', async () => {
      const res = await baseDao.deleteMany('test', 'fruits', {
        _id: { $in: Object.values(insertRes.insertedIds) },
      })
      assert.strictEqual(res.deletedCount, 2)
    })
  })
  describe('updateOne()', () => {
    let upsertRes = null
    const doc = {
      name: '_苹果1',
      category: '水果',
      price: 10,
    }
    after(() => {
      baseDao.deleteOne('test', 'fruits', {
        _id: upsertRes.upsertedId,
      })
    })
    it('updateOne() should update the price ', async () => {
      const query = { name: doc.name }
      const updateDoc = {
        $set: {
          price: 20,
        },
      }
      const options = { upsert: true }
      upsertRes = await baseDao.updateOne(
        'test',
        'fruits',
        query,
        updateDoc,
        options
      )
      const findRes = await baseDao.findOne<Fruits>('test', 'fruits', query)
      assert.strictEqual(findRes.price, 20)
    })
  })
  describe('replaceOne()', () => {
    let updateRes = null
    const doc: Fruits = {
      name: '_苹果2',
      category: '水果',
      price: 10,
    }
    after(() => {
      baseDao.deleteOne('test', 'fruits', {
        _id: updateRes.upsertedId,
      })
    })
    it('replaceOne() should update the price ', async () => {
      const query: Fruits = { name: doc.name }
      const options = { upsert: true }
      updateRes = await baseDao.replaceOne<Fruits>(
        'test',
        'fruits',
        query,
        doc,
        options
      )
      const findRes = await baseDao.findOne<Fruits>('test', 'fruits', query)
      assert.strictEqual(findRes.price, 10)
    })
  })
  describe('findOneAndUpdate()', () => {
    let insertRes = null
    const query = { name: '_苹果3' }
    before(async () => {
      insertRes = await baseDao.insertOne('test', 'fruits', query)
    })
    after(() => {
      baseDao.deleteOne('test', 'fruits', { _id: insertRes.insertedId })
    })
    it('findOneAndUpdate() should update the price ', async () => {
      const updateDoc = {
        $set: {
          price: 20,
        },
      }
      const options: FindOneAndUpdateOptions = {
        upsert: true,
        returnDocument: 'after',
      }
      const upsertRes = await baseDao.findOneAndUpdate<Fruits>(
        'test',
        'fruits',
        query,
        updateDoc,
        options
      )
      assert.strictEqual(upsertRes.value.price, 20)
    })
  })
})
