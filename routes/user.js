const express = require('express')
const router = express.Router()
const db = require('../models')
const Users = db.Users
const bcrypt = require('bcryptjs')

router.post('/register', async (req, res, next) => {

    const { name, email, password, confirmPassword } = req.body


    if (!email || !password || !name) {

        return res.redirect('back')
    }
    if (password !== confirmPassword) {

        return res.redirect('back')
    }
    const isReapCount = await Users.count({ where: { email } })
    await console.log(isReapCount)

    if (isReapCount > 0) {

        return res.redirect('back')
    }
    const hash = await bcrypt.hash(password, 10)
    return Users.create({ name, email, password: hash })
        .then(() => {

            res.redirect('/login')
        })
        .catch((error) => {
            next(error)
        })
})





module.exports = router