import ora from 'ora'
import {
  FindOptions,
  InsertOneResult,
  MongoClient,
  OptionalUnlessRequiredId,
} from 'mongodb'
import dbConfig from '../../config/db.js'
import defaultData from './defaultData.js'

let client: MongoClient = null

function getClient(uri = dbConfig.uri): Promise<MongoClient> {
  return new Promise((resolve, reject) => {
    if (client) {
      resolve(client)
      return
    }
    const spinner = ora(`连接 ${uri} ...\n`)
    client = new MongoClient(uri)
    spinner.start()
    client
      .connect()
      .then((res) => {
        spinner.stop()
        resolve(res)
      })
      .catch((err) => {
        spinner.stop()
        client = null
        reject(err)
      })
  })
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

async function find<T>(
  dbName: string,
  colName: string,
  filter: T,
  options?: FindOptions
): Promise<T[]> {
  const client = await getClient()
  return await client
    .db(dbName)
    .collection<T>(colName)
    .find<T>(filter, options)
    .toArray()
}
async function insertOne<T>(
  dbName: string,
  colName: string,
  doc: OptionalUnlessRequiredId<T>
): Promise<InsertOneResult<T>> {
  const client = await getClient()
  return await client.db(dbName).collection<T>(colName).insertOne(doc)
}
async function insertMany<T>(
  dbName: string,
  colName: string,
  doc: OptionalUnlessRequiredId<T>
): Promise<InsertOneResult<T>> {
  const client = await getClient()
  return await client.db(dbName).collection<T>(colName).insertOne(doc)
}

function close() {
  if (client) {
    client.close()
    client = null
  }
}

const baseDaoTs = {
  getClient,
  close,
  findOne,
  find,
  insertOne,
}
export default baseDaoTs
