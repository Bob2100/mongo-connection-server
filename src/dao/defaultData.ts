export default {
  init(client) {
    client
      .db('test')
      .collection('fruits')
      .createIndex({ name: 1 }, { unique: true })
  },
}
