import ora from 'ora'
import {
  DeleteResult,
  Filter,
  FindOneAndUpdateOptions,
  FindOptions,
  InsertManyResult,
  InsertOneResult,
  ModifyResult,
  MongoClient,
  OptionalUnlessRequiredId,
  UpdateFilter,
  UpdateOptions,
  UpdateResult,
} from 'mongodb'
import { Document } from 'bson'
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
  filter: Filter<T>,
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
function updateOne<T>(
  dbName: string,
  colName: string,
  filter: Filter<T>,
  update: Partial<T> | UpdateFilter<T>,
  options?: UpdateOptions
): Promise<UpdateResult> {
  return new Promise((resolve) => {
    getClient().then((client) => {
      resolve(
        client
          .db(dbName)
          .collection<T>(colName)
          .updateOne(filter, update, options)
      )
    })
  })
}
function findOneAndUpdate<T>(
  dbName: string,
  colName: string,
  filter: Filter<T>,
  update: UpdateFilter<T>,
  options?: FindOneAndUpdateOptions
): Promise<ModifyResult<T>> {
  return new Promise((resolve) => {
    getClient().then((client) => {
      resolve(
        client
          .db(dbName)
          .collection<T>(colName)
          .findOneAndUpdate(filter, update, options)
      )
    })
  })
}
function updateMany<T>(
  dbName: string,
  colName: string,
  filter: Filter<T>,
  update: UpdateFilter<T>
): Promise<UpdateResult | Document> {
  return new Promise((resolve) => {
    getClient().then((client) => {
      resolve(
        client.db(dbName).collection<T>(colName).updateMany(filter, update)
      )
    })
  })
}
function deleteOne<T>(
  dbName: string,
  colName: string,
  filter: Filter<T>
): Promise<DeleteResult> {
  return new Promise((resolve) => {
    getClient().then((client) => {
      resolve(client.db(dbName).collection<T>(colName).deleteOne(filter))
    })
  })
}
function deleteMany<T>(
  dbName: string,
  colName: string,
  filter: Filter<T>
): Promise<DeleteResult> {
  return new Promise((resolve) => {
    getClient().then((client) => {
      resolve(client.db(dbName).collection<T>(colName).deleteMany(filter))
    })
  })
}

function close() {
  if (client) {
    client.close()
    client = null
  }
}

const baseDao = {
  getClient,
  close,
  findOne,
  find,
  insertOne,
  insertMany,
  updateOne,
  findOneAndUpdate,
  updateMany,
  deleteOne,
  deleteMany,
}
export default baseDao
