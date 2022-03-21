import baseDao from './dao/baseDao.js'

baseDao.find('test', 'fruits', {}).then((res) => {
  console.log(res)
  baseDao.close()
})
