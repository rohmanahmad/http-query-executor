// DATA
const dataAdd = require('./data/add')
const dataDelete = require('./data/delete')
const dataList = require('./data/list')
const dataUpdate = require('./data/update')
const dataExecute = require('./data/execute')

// COLLECTION
const collectionCreate = require('./collection/create')
const collectionAlter = require('./collection/indexing')
const collectionList = require('./collection/list')
const collectionRemove = require('./collection/remove')

// OTHER
const knowledge = require('./knowledge')

module.exports = [
  knowledge,
  dataExecute,
  dataList,
  dataAdd,
  dataDelete,
  dataUpdate,
  collectionCreate,
  collectionAlter,
  collectionList,
  collectionRemove
]