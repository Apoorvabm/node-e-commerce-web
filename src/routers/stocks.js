const express = require('express')
const Stock = require('../models/stock')
const stockController = require('../controllers/stock')
const router = new express.Router()

router.get('/test',(req,res)=>{
    res.send('from a new file')
})

router.post('/stock',stockController.create_stock)
//    user.save().then(()=>{
//         res.status(201).send(user)
//    }).catch((e)=>{
//         res.status(400).send(e)
//    })

router.get('/stock',stockController.read_stock)

router.get('/stock/:id',stockController.read_stockid)


router.get('/stock_find/:category',stockController.read_category)

router.patch('/stock/:id',stockController.update_byid)

router.delete('/stock/:id',stockController.delete_byid)


module.exports = router