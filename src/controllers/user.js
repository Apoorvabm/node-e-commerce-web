const User = require('../models/user')

const create_user = async (req,res)=>{
    // console.log(req.body)
    // res.send('testing..')
   const user = new User(req.body) 
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }
    catch(e){
        res.status(400).send(e)
    }
}

const read_user = async (req,res)=>{
    res.send(req.user)
    // try{
    //     const user = await User.find({})
    //     res.send(user)
    // }
    // catch(e){
    //     res.status(500).send(e)
    // }
}

const read_userid = async (req,res)=>{
    //console.log(req.params)
    try{
        const _id = req.params.id
        const user= await User.findById(_id)
        if(!user)
          return res.status(404).send()
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
}

const read_useremail = async (req,res)=>{
    const email = req.params.email
    try{
        const user = await User.find({email:email})
        if(!user)
          return res.status(404).send()
        res.send(user)
    }catch(e){
        res.status(500).send()
    }
}

const update_user = async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','address','phone','email','password']
    const isvalidOperations = updates.every((update)=>allowedUpdates.includes(update))
    if(!isvalidOperations){
        res.status(400).send({error:'Invalid updates'})
    }
    //const user = await User.findByIdAndUpdate(req.params.id , req.body , {new:true, runValidators:true})
    try{
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update]=req.body[update])
        await user.save()
        if(!user)
           return res.status(404).send()
        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
}

const delete_user = async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user)
          res.status(404).send()
        res.send(user)

    }catch(e){
        res.status(500).send()
    }
}

const user_login = async(req,res)=>{
    try{
        const user = await  User.findByCredentials(req.body.email ,req.body.password)
        const token = await user.generateAuthToken()
        console.log(token)
        res.send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
}

const user_logout  = async (req,res)=>{
    try{
            req.user.tokens = req.user.tokens.filter((token)=>{
                return token.token !== req.token
            })
            await req.user.save()
            res.send()
    }catch(e){
        res.status(500).send()
    }
}

const user_logoutall  = async (req,res)=>{
    try{
            req.user.tokens = []
            await req.user.save()
            res.send()
    }catch(e){
        res.status(500).send()
    }
}
module.exports = {
"create_user":create_user,
"read_user":read_user,
"read_userid":read_userid,
"read_useremail": read_useremail,
"update_user":update_user,
"delete_user":delete_user,
"user_login":user_login,
"user_logout":user_logout,
"user_logoutall":user_logoutall
}