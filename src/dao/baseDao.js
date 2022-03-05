import ora from 'ora'
import { MongoClient } from 'mongodb'
import dbConfig from '../../config/db.js'
import defaultData from './defaultData.js'

let client = null

export default {
  async getClient(uri = dbConfig.uri) {
    if (client) {
      return client
    }
    const spinner = ora(`连接 ${uri} ...\n`)
    try {
      client = new MongoClient(uri)
      spinner.start()
      await client.connect()
      spinner.stop()
      defaultData.init(client)
      return client
    } catch (error) {
      client.close()
      client = null
      console.error(error)
      spinner.stop()
    }
    return null
  },
  close() {
    if (client) {
      client.close()
      client = null
    }
  },
  async findOne(dbName, colName, query, options) {
    const client = await this.getClient()
    return client.db(dbName).collection(colName).findOne(query, options)
  },
  async find(dbName, colName, query, options) {
    const client = await this.getClient()
    return client.db(dbName).collection(colName).find(query, options).toArray()
  },
  async insertOne(dbName, colName, doc) {
    const client = await this.getClient()
    return client.db(dbName).collection(colName).insertOne(doc)
  },
  async insertMany(dbName, colName, docs, options) {
    const client = await this.getClient()
    return client.db(dbName).collection(colName).insertMany(docs, options)
  },
  async deleteOne(dbName, colName, query) {
    const client = await this.getClient()
    return client.db(dbName).collection(colName).deleteOne(query)
  },
  async deleteMany(dbName, colName, query) {
    const client = await this.getClient()
    return client.db(dbName).collection(colName).deleteMany(query)
  },
  async updateOne(dbName, colName, query, updateDoc, options) {
    const client = await this.getClient()
    return client
      .db(dbName)
      .collection(colName)
      .updateOne(query, updateDoc, options)
  },
}
