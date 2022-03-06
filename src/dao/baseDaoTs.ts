import ora from 'ora'
import { FindOptions, MongoClient, ObjectId } from 'mongodb'
import dbConfig from '../../config/db.js'
import defaultData from './defaultData.js'

let client: MongoClient = null

async function getClient(uri = dbConfig.uri): Promise<MongoClient> {
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
}

async function findOne<T>(
  dbName: string,
  colName: string,
  filter: T,
  options?: FindOptions
): Promise<T> {
  const client = await getClient()
  return await client
    .db(dbName)
    .collection<T>(colName)
    .findOne<T>(filter, options)
}

const baseDaoTs = {
  getClient,
  findOne,
}
export default baseDaoTs
