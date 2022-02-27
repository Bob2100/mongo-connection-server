import ora from 'ora'
import { MongoClient } from 'mongodb'
const uri = 'mongodb://localhost:27017'
let client = null

export default {
  async getClient() {
    if (client) {
      return client
    }
    const spinner = ora(`连接 ${uri} ...\n`)
    try {
      const c = new MongoClient(uri)
      spinner.start()
      await c.connect()
      spinner.stop()
      client = c
      return client
    } catch (error) {
      console.error(error)
      spinner.stop()
    }
    return null
  },
  close() {
    if (client) {
      client.close()
    }
  },
}
