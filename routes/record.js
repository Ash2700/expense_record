const express = require('express')
const router = express.Router()
const db = require('../models')
const record = db.records
const categoryData = require('../public/json/icon.json').CATEGORY
const zeroString = '0'

// 修改資料
function dataModify (rawDataFormDatabase) {
  return rawDataFormDatabase.map((item) => {
    item.date = dateFormChange(item)
    item.label = giveLabelMatchID(item)
    return item
  })
}
// 修改時間格式
function dateFormChange (data) {
  return new Date(data.date).toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

// 加入圖示標籤到資料裡
function giveLabelMatchID (item) {
  const matchGroup = categoryData.find((group) => (group.id === item.categoryID))
  if (matchGroup) {
    return matchGroup.label
  } else {
    return null
  }
}

router.get('/', async (req, res, next) => {
  const userId = req.user.id
  const categoryID = req.query.category ? req.query.category : zeroString

  const recordData = await record.findAll({
    attributes: ['id', 'name', 'amount', 'userID', 'categoryID', 'date'],
    raw: true
  })
  const totalAmount = await sumFromCategory(categoryID)
  await dataModify(recordData)
  return res.render('home', { records: recordData, totalAmount, selected: categoryID })
})

async function sumFromCategory (categoryIDFormReq) {
  const id = categoryIDFormReq || zeroString
  if (id === zeroString) {
    return await record.sum('amount')
  } else {
    const SumCategory = await record.sum('amount', { where: { categoryID: id } })
    if (!SumCategory) {
      return 0
    }
    return SumCategory
  }
}

router.get('/add', (req, res, next) => {
  res.send('add expense')
})
router.post('/', (req, res, next) => {
  res.send('record post')
})

router.get('/edit', (req, res, next) => {
  res.send('edit expense')
})
router.put('/', (req, res, next) => {
  res.send('record put')
})

router.delete('/', (req, res, next) => {
  res.send('record delete')
})

module.exports = router
