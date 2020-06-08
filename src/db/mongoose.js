const mongoose = require('mongoose')

//mongodb+srv://apoorva:PSlcubVM6fV2mXTc@cluster0-dphd9.mongodb.net/e-commerce?retryWrites=true&w=majority
mongoose.connect('mongodb://127.0.0.1:27017/e-commerce'
,{
    useNewUrlParser:true ,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>{
    console.log('connected')
}).catch((error)=>{
    console.log(error)
})
