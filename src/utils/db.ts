// const ora = require('ora')
import { MongoClient } from 'mongodb'
const uri = 'mongodb://localhost:2701'
let client: MongoClient = null

export default {
  async getClient(): Promise<MongoClient> {
    if (client) {
      return client
    }
    // const spinner = ora(`连接${uri} ...`)
    try {
      const c = new MongoClient(uri)
      // spinner.start()
      await c.connect()
      // spinner.stop()
      client = c
      return client
    } catch (error) {
      // spinner.stop()
    }
    return null
  },
  close() {
    if (client) {
      client.close()
    }
  },
}
