const express= require('express')
const router = express.Router()
const record= require('./record')


router.use('/record',record)

router.get('/',(req, res, next)=>{
    res.redirect('/login')
})


router.get('/login',(req, res, next)=>{
    res.send('login')
})

router.get('/register', (req, res, next)=>{
    res.send('register')
})

router.post('/logout', (req, res, next)=>{
    res.send('logout')
})

module.exports=router