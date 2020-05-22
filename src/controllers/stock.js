const Stock = require('../models/stock')

const create_stock = async (req,res)=>{
    // console.log(req.body)
    // res.send('testing..')
   const item = new Stock(req.body) 
    try{
        await user.save()
        res.status(201).send(item)
    }
    catch(e){
        res.status(400).send(e)
    }
}

const read_stock = async (req,res)=>{
    try{
        const item = await Stock.find({})
        res.send(item)
    }
    catch(e){
        res.status(500).send(e)
    }
}

const read_stockid = async (req,res)=>{
    //console.log(req.params)
    try{
        const _id = req.params.id
        const item= await Stock.findById(_id)
        if(!item)
          return res.status(404).send()
        res.send(item)
    }catch(e){
        res.status(500).send(e)
    }
}
const read_category = async (req,res)=>{
    const category = req.params.category
    try{
        const item = await Stock.find({category})
        if(!item)
          return res.status(404).send()
        res.send(item)
    }catch(e){
        res.status(500).send()
    }
}

const update_byid = async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','address','phone','email']
    const isvalidOperations = updates.every((update)=>allowedUpdates.includes(update))
    if(!isvalidOperations){
        res.status(400).send({error:'Invalid updates'})
    }
    const item = await Stock.findByIdAndUpdate(req.params.id , req.body , {new:true, runValidators:true})
    try{
        if(!item)
           return res.status(404).send()
        res.send(item)
    }catch(e){
        res.status(400).send(e)
    }
}

const delete_byid = async(req,res)=>{
    try{
        const item = await Stock.findByIdAndDelete(req.params.id)
        if(!item)
          res.status(404).send()
        res.send(item)

    }catch(e){
        res.status(500).send()
    }
}

module.exports = {
    "create_stock":create_stock,
    "read_stock":read_stock,
    "read_stockid":read_stockid,
    "read_category":read_category,
    "update_byid":update_byid,
    "delete_byid":delete_byid
}