import { MongoClient } from 'mongodb'
const uri = 'mongodb://localhost:2701'
let client: MongoClient = null

export default {
  async getClient(): Promise<MongoClient> {
    if (client) {
      return client
    }
    client = new MongoClient(uri)
    await client.connect()
    return client
  },
  close() {
    if (client) {
      client.close()
    }
  },
}
