import { MongoClient } from 'mongodb'
const uri = 'mongodb://localhost:27017'
let client = null

export default {
  getClient() {
    if (client) {
      return client
    }
    client = new MongoClient(uri)
    return client
  },
}
