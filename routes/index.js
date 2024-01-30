const express = require('express')
const router = express.Router()
const record = require('./record')
const user = require('./user')
const passport = require('passport')
const authHandler = require('../middleware/auth-handler')

const db=require('./models')
const records=db.record
const category = db.categoory
async function test(){
  const rec= records.findByPk(1,{
    attributes:['id','name'],
    raw:true
  })
  const cat = category.findByPk(1,{
    attributes:['id','name'],
    raw:true
    

  })
const i =await rec
const k = await cat
  console.log(i)
  console.log(k)

}


router.use('/user', user)
router.use('/records', authHandler, record)

router.get('/', (req, res, next) => {
  res.redirect('/login')
})

router.get('/login', (req, res, next) => {
  res.render('login')
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/records',
  failureRedirect: '/login',
  failureFlash: true
}))

router.get('/register', (req, res, next) => {
  res.render('register')
})

router.post('/logout', (req, res, next) => {
  req.logOut((error) => {
    if (error) { return next(error) }
  })
  req.flash('success', '登出成功')
  res.redirect('/login')
})

module.exports = router
