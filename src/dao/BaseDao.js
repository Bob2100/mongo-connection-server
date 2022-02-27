import dbUtils from '../utils/dbUtils.js'
export default class BaseDao {
  findOne(db, collection, query, options) {
    return dbUtils
      .getClient()
      .db(db)
      .collection(collection)
      .findOne(query, options)
  }
}
