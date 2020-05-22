const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const userController  = require('../controllers/user')
const router = new express.Router()

router.get('/test',(req,res)=>{
    res.send('from a new file')
})

router.post('/cust',userController.create_user)
//    user.save().then(()=>{
//         res.status(201).send(user)
//    }).catch((e)=>{
//         res.status(400).send(e)
//    })
router.post('/cust/login',userController.user_login)

router.post('/cust/logout',auth,userController.user_logout)
router.post('/cust/logoutAll',auth,userController.user_logoutall)

router.get('/cust/me',auth,userController.read_user)

router.get('/cust/:id',userController.read_userid)

router.get('/cust_find/:email',userController.read_useremail)

router.patch('/cust/:id',userController.update_user)

router.delete('/cust/:id',userController.delete_user)


module.exports = router