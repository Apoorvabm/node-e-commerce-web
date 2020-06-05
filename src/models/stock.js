const mongoose = require('mongoose')
// const validator = require('validator')


const Stock = mongoose.model('Stock',{
    itemName:{
        type: 'String',
        required: true,
        trim:true
    },
    category:{
        type:'String',
        required:true,
        trim:true,
    },
    cost:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
})

module.exports = Stock


