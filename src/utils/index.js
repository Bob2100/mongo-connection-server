import db from './dbUtils.js'
export default {
  db,
  sum(...rest) {
    let sum = 0
    for (let n of rest) {
      sum += n
    }
    return sum
  },
}
