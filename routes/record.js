const express = require('express')
const router = express.Router()
const db = require('../models')
const record = db.records
const categoryData = require('../public/json/icon.json').CATEGORY
const zeroString = '0'

// 修改資料
function dataModify (rawDataFormDatabase) {
  return rawDataFormDatabase.map((item) => {
    dateFormChange(item)
    giveLabelMatchID(item)
    return item
  })
}
// 修改時間格式
function dateFormChange (data) {
  return data.date=new Date(data.date).toISOString().split('T')[0]
}
// 加入圖示標籤到資料裡
function giveLabelMatchID (item) {
  const matchGroup = categoryData.find((group) => (group.id === item.categoryID))
  if (matchGroup) {
    return item.label =matchGroup.label
  } else {
    return null
  }
}

router.get('/', async (req, res, next) => {
  const userId = req.user.id
  const categoryID = req.query.category ? req.query.category : zeroString

  const recordData = await record.findAll({
    attributes: ['id', 'name', 'amount', 'userID', 'categoryID', 'date'],
    where:{userID:userId},
    raw: true
  })
  
  const totalAmount = await sumFromCategory(categoryID,userId)
  await dataModify(recordData)
  return res.render('home', { records: recordData, totalAmount, selected: categoryID })
})
//get sum form category or all
async function sumFromCategory (categoryIDFormReq, userId) {
  const id = categoryIDFormReq || zeroString
  if (id === zeroString) {
    const sumAllCategory=await record.sum('amount',{where:{userID:userId}})
    if(!sumAllCategory){
      return 0
    }
    return sumAllCategory
  } else {
    const SumCategory = await record.sum('amount', { where: { categoryID: id,userID:userId } })
    if (!SumCategory) {
      return 0
    }
    return SumCategory
  }
}

router.get('/add', (req, res, next) => {
  res.render('expense',{categoryData})
})

router.post('/add',  (req, res, next) => {
  const {name, date, categoryId , amount} = req.body
  const usingID=req.user.id
  const checkInfo= checkData(req.body)
  if(checkInfo.result===false){
    req.flash('error',`${checkInfo.message}`)
    return res.redirect('back')
  }
  return record.create({name,date,categoryID:categoryId,amount,userID:usingID})
    .then(()=>{
      req.flash('success','新增成功')
      res.redirect('/records')
    })
    .catch((error)=>{
      error.errorMessage='新增失敗'
      next(error)
    })
})
//檢查資料
function checkData(reqBodyData){
  const {name, date, categoryId, amount} =reqBodyData
  let info={result:false,message:''}
  if(!name || !date || !categoryId || !amount){
    info.message='必填欄位需輸入'
    return info
  }
  info.result=true
  return info
}

router.get('/edit/:id', async (req, res, next) => {
  const recordID= req.params.id
  
  const usingID= req.user.id
  const recordData =await record.findOne({
    attributes:['id', 'name' , 'date', 'amount', 'userID', 'categoryID'],
    where:{id:recordID,userID:usingID},
    raw:true
  })
  if(!recordData){
    req.flash('error','查無此資料')
    return res.redirect('back')
  }
  if(recordData.userID !== usingID){
    req.flash('error','權限不足')
    return res.redirect('back')
  }
  dateFormChange(recordData)
  return res.render('editRecord',{categoryData,record:recordData})
})

router.put('/edit/:id', (req, res, next) => {
  const {name , date, amount, categoryId}=req.body
  const recordId = req.params.id
  const usingID= req.user.id
  return record.update({
  name,date,amount,categoryID:categoryId},{where:{id:recordId,userID:usingID}})
  .then(()=>{
  req.flash('success','更新成功')
  
  })
  res.send('record put')
})

router.delete('/', (req, res, next) => {
  res.send('record delete')
})

module.exports = router
