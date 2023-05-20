// DATA
const dataAdd = require('./data/add')
const dataDelete = require('./data/delete')
const dataList = require('./data/list')
const dataUpdate = require('./data/update')
const dataExecute = require('./data/execute')

// TABLE
const tableCreate = require('./table/create')
const tableAlter = require('./table/alter')
const tableList = require('./table/list')
const tableRemove = require('./table/remove')
const tableTruncate = require('./table/truncate')

// OTHER
const knowledge = require('./knowledge')

module.exports = [
  knowledge,
  dataAdd,
  dataDelete,
  dataList,
  dataUpdate,
  dataExecute,
  tableCreate,
  tableAlter,
  tableList,
  tableRemove,
  tableTruncate
]