const mongoose = require('mongoose')

const prodSchema = new mongoose.Schema({

    name:{
        type:String,
        required : [true,'please provide product name'],
        min:1,
        max:50,
        unique : true,
    },      
    desc:{
        type: String,
        required : [true,'please provide product name'],
        min:1,
        max:1000,
    },
    category : {
        type : String,
        required :[true,'Please provide product category']
    },
    price : {
        type : Number,
        required : [true,'please provide product price'],
    },
    img_url :{
         type : String,
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('Product',prodSchema)