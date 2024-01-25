const express= require('express')
const router= express.Router()

router.get('/',(req, res, next)=>{
    res.send('record home')
})

router.post('/',(req, res, next)=>{
    res.send('record post')
})

router.put('/',(req, res, next)=>{
    res.send('record put')
})

router.delete('/', (req, res, next)=>{
    res.send('record delete')
})

module.exports=router