module.exports= (error, req, res, next)=>{
    console.error(error)
    req.flash('error', error.errorMessage||'處理錯誤')
    res.redirect('back')
    next(error)
}