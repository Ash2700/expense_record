const express = require('express')
const router = express.Router()
const record = require('./record')
const user = require('./user')
const passport = require('passport')
const authHandler = require('../middleware/auth-handler')

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
