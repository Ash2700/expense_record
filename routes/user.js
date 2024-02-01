const express = require('express')
const router = express.Router()
const db = require('../models')
const Users = db.Users
const bcrypt = require('bcryptjs')

router.post('/register', async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body

  if (!email || !password || !name) {
    req.flash('error', 'email及密碼必須填寫')
    return res.redirect('back')
  }
  if (password !== confirmPassword) {
    req.flash('error', '驗證密碼必須和密碼相同')
    return res.redirect('back')
  }
  const isReapCount = Users.count({ where: { email } })

  if (await isReapCount > 0) {
    req.flash('error', '此email已註冊')
    return res.redirect('back')
  }
  const hash = bcrypt.hash(password, 10)
  return Users.create({ name, email, password: await hash })
    .then(() => {
      req.flash('success', '註冊成功')
      res.redirect('/login')
    })
    .catch((error) => {
      error.errorMessage = '註冊失敗'
      next(error)
    })
})

module.exports = router
