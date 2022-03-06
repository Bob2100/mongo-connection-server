import ora from 'ora'
import {
  FindOptions,
  InsertManyResult,
  InsertOneResult,
  MongoClient,
  OptionalUnlessRequiredId,
} from 'mongodb'
import dbConfig from '../../config/db.js'

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

function findOne<T>(
  dbName: string,
  colName: string,
  filter: T,
  options?: FindOptions
): Promise<T> {
  return new Promise((resolve) => {
    getClient().then((client) => {
      resolve(
        client.db(dbName).collection<T>(colName).findOne<T>(filter, options)
      )
    })
  })
}

function find<T>(
  dbName: string,
  colName: string,
  filter: T,
  options?: FindOptions
): Promise<T[]> {
  return new Promise((resolve) => {
    getClient().then((client) => {
      resolve(
        client
          .db(dbName)
          .collection<T>(colName)
          .find<T>(filter, options)
          .toArray()
      )
    })
  })
}
function insertOne<T>(
  dbName: string,
  colName: string,
  doc: OptionalUnlessRequiredId<T>
): Promise<InsertOneResult<T>> {
  return new Promise((resolve) => {
    getClient().then((client) => {
      resolve(client.db(dbName).collection<T>(colName).insertOne(doc))
    })
  })
}
function insertMany<T>(
  dbName: string,
  colName: string,
  docs: OptionalUnlessRequiredId<T>[]
): Promise<InsertManyResult<T>> {
  return new Promise((resolve) => {
    getClient().then((client) => {
      resolve(client.db(dbName).collection<T>(colName).insertMany(docs))
    })
  })
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
  insertMany,
}
export default baseDaoTs
