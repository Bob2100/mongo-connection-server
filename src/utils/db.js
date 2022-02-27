import { MongoClient } from 'mongodb'
const uri = 'mongodb://localhost:27017'
const client = null

export default {
  getClient() {
    if (client) {
      return client
    }
    client = new MongoClient(uri)
  },
}
