const mongoose = require('mongoose')


mongoose.connect('mongodb+srv://apoorva:PSlcubVM6fV2mXTc@cluster0-dphd9.mongodb.net/e-commerce?retryWrites=true&w=majority'
,{
    useNewUrlParser:true ,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>{
    console.log('connected')
}).catch((error)=>{
    console.log(error)
})
