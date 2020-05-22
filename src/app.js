const express = require('express')
require('./db/mongoose')
const custRouter  = require('./routers/customers')
const stockRouter  = require('./routers/stocks')


const app = express()

// app.use((req,res,next)=>{
//     // console.log(req.method,req.path)
//     if(req.method === 'GET')
//        res.send('GET requests are disabled')
//     else
//     next()
// })

// app.use((req,res,next)=>{
//     res.status(503).send('Site is currently done.Check back soon')
// })

app.use(express.json())
app.use(custRouter)
app.use(stockRouter)

// const router = new express.Router()
// router.get('/test',(req,res)=>{
//     res.send('this is from another router')
// })
// app.use(router)



//eval(require("locus"));



// const jwt  = require('jsonwebtoken')

// const myFunc = async() =>{
//     const token = jwt.sign({_id :'abc123'},'thisismycourse',{expiresIn:'7 days'})
//     console.log(token)
//     const data= jwt.verify(token,'thisismycourse')
//     console.log(data)
// }
// myFunc()

module.exports = app