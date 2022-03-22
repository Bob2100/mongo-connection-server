import ora from 'ora'
import {
  CountDocumentsOptions,
  DeleteResult,
  DistinctOptions,
  Filter,
  FindOneAndUpdateOptions,
  FindOptions,
  InsertManyResult,
  InsertOneResult,
  ModifyResult,
  MongoClient,
  OptionalUnlessRequiredId,
  ReplaceOptions,
  RunCommandOptions,
  UpdateFilter,
  UpdateOptions,
  UpdateResult,
  WithoutId,
} from 'mongodb'
import { Document } from 'bson'
import dbConfig from '../../config/db.js'

export default {
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
  drop,
  replaceOne,
  countDocuments,
  distinct,
  command,
}

async function command(
  dbName: string,
  command: Document,
  options?: RunCommandOptions
): Promise<Document> {
  const client = await getClient()
  return await client.db(dbName).command(command, options)
}

async function distinct<T>(
  dbName: string,
  colName: string,
  key: string,
  filter?: Filter<T>,
  options?: DistinctOptions
): Promise<any[]> {
  const client = await getClient()
  return await client
    .db(dbName)
    .collection(colName)
    .distinct(key, filter, options)
}

async function countDocuments<T>(
  dbName: string,
  colName: string,
  filter?: Filter<T>,
  options?: CountDocumentsOptions
): Promise<number> {
  const client = await getClient()
  return await client
    .db(dbName)
    .collection(colName)
    .countDocuments(filter, options)
}

async function drop(dbName: string, colName: string): Promise<boolean> {
  const client = await getClient()
  return await client.db(dbName).collection(colName).drop()
}

async function replaceOne<T>(
  dbName: string,
  colName: string,
  filter: Filter<T>,
  replacement: WithoutId<T>,
  options: ReplaceOptions
): Promise<Document | UpdateResult> {
  const client = await getClient()
  return await client
    .db(dbName)
    .collection<T>(colName)
    .replaceOne(filter, replacement, options)
}

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
