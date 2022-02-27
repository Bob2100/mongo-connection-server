import ora from 'ora'
import { MongoClient } from 'mongodb'
import dbConfig from '../../config/db.js'
let client = null

export default class BaseDao {
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
      return client
    } catch (error) {
      client.close()
      client = null
      console.error(error)
      spinner.stop()
    }
    return null
  }
  close() {
    if (client) {
      client.close()
      client = null
    }
  }
  async findOne(db, collection, query, options) {
    const client = await this.getClient()
    return client.db(db).collection(collection).findOne(query, options)
  }
}
