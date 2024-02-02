const express = require('express')
const router = express.Router()
const db = require('../models')
const { compareSync } = require('bcryptjs')
const record = db.records
const categoryData = require('../public/json/icon.json').CATEGORY


// 修改資料
function dataModify (rawDataFormDatabase) {
  rawDataFormDatabase.map((item) => {
    dateFormChange(item)
    giveLabelMatchID(item)
  })
}
// 修改時間格式
function dateFormChange (data) {
  data.date = new Date(data.date).toISOString().split('T')[0]
}
// 加入圖示標籤到資料裡
function giveLabelMatchID (item) {
  const matchGroup = categoryData.find((group) => (group.id === item.categoryID))
  if (matchGroup) {
    item.label = matchGroup.label
  } else {
    return null
  }
}
function searchKeyword(userId, categoryId){
  let searchOption={userID:userId}
  const zeroString = '0'
  const categoryID= categoryId ? categoryId: zeroString
  if(categoryID=== zeroString){
    return searchOption
  }
  searchOption = {userID:userId , categoryID}
  return searchOption
}

router.get('/', async (req, res, next) => {
  const userId = req.user.id
  const categoryID = req.query.category

  const recordData = await record.findAll({
    attributes: ['id', 'name', 'amount', 'userID', 'categoryID', 'date'],
    order:[['date','DESC']],
    where: searchKeyword(userId,categoryID),
    raw: true
  })
  const totalAmount = sumFromCategory(categoryID,recordData)
  dataModify(recordData)
  return res.render('home', { records: await recordData, totalAmount: await totalAmount, selected: categoryID })
})
// get sum form category or all
function sumFromCategory (categoryIDFormReq,recordWithUsing) {
  const zeroString = '0'
  const id = categoryIDFormReq || zeroString
  if (id === zeroString) {
    const sumAllCategory = recordWithUsing.reduce((total,item)=>{
         return total + item.amount
      },0)
    return  sumAllCategory
  } else {
    const SumCategory = recordWithUsing.reduce((total,item)=>{
      if(item.categoryID === Number(id)){
        return total + item.amount
      }
      return total
    },0)
    return SumCategory
  }
}

router.get('/add', (req, res, next) => {
  res.render('expense', { categoryData })
})

router.post('/add', (req, res, next) => {
  const { name, date, categoryId, amount } = req.body
  const usingID = req.user.id
  const checkInfo = checkData(req.body)
  if (checkInfo.result === false) {
    req.flash('error', `${checkInfo.message}`)
    return res.redirect('back')
  }
  return record.create({ name, date, categoryID: categoryId, amount, userID: usingID })
    .then(() => {
      req.flash('success', '新增成功')
      res.redirect('/records')
    })
    .catch((error) => {
      error.errorMessage = '新增失敗'
      next(error)
    })
})
// 檢查資料
function checkData (reqBodyData) {
  const { name, date, categoryId, amount } = reqBodyData
  let info = { result: false, message: '' }
  if (!name || !date || !categoryId || !amount) {
    info.message = '必填欄位需輸入'
    return info
  }
  info.result = true
  return info
}

router.get('/edit/:id', async (req, res, next) => {
  const recordID = req.params.id
  const usingID = req.user.id
  try {
    const recordData = await record.findByPk(recordID, {
      attributes: ['id', 'name', 'date', 'amount', 'userID', 'categoryID'],
      raw: true
    })
    if (!recordData) {
      req.flash('error', '查無此資料')
      return res.redirect('back')
    }
    if (recordData.userID !== usingID) {
      req.flash('error', '權限不足')
      return res.redirect('back')
    }
    dateFormChange(recordData)
    return res.render('editRecord', { categoryData, record: recordData })
  } catch (error) {
    error.errorMessage = '處理失敗'
    next(error)
  }
})

router.put('/edit/:id', async (req, res, next) => {
  const { name, date, amount, categoryId } = req.body
  const recordId = req.params.id
  const usingID = req.user.id
  try {
    const recordData = await record.findByPk(recordId, {
      attributes: ['id', 'name', 'date', 'amount', 'userID', 'categoryID']
    })
    if (!recordData) {
      req.flash('error', '查無此資料')
      return res.redirect('back')
    }
    if (recordData.userID !== usingID) {
      req.flash('error', '權限不足')
      return res.redirect('back')
    }
    await recordData.update({ name, date, amount, categoryId })
    req.flash('success', '更新成功')
    return res.redirect('/records')
  } catch (error) {
    error.errorMessage = '修改失敗'
    next(error)
  }
})

router.delete('/edit/:id', async (req, res, next) => {
  const recordId = req.params.id
  const usingID = req.user.id
  try {
    const recordData = await record.findByPk(recordId, {
      attributes: ['id', 'name', 'date', 'amount', 'userID', 'categoryID']
    })
    if (!recordData) {
      req.flash('error', '查無此資料')
      return res.redirect('back')
    }
    if (recordData.userID !== usingID) {
      req.flash('error', '權限不足')
      return res.redirect('back')
    }
    recordData.destroy()
    req.flash('success', '刪除成功')
    return res.redirect('/records')
  } catch (error) {
    error.errorMessage = '刪除失敗'
    next(error)
  }
})

module.exports = router
