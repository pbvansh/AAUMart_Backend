const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,'please provide category name'],
        min:2,
        max:100,
        unique : true,
    },
    desc : {
        type: String,
        min : 2,
        max : 1000,
    }

},
{
    timestamps:true
})

module.exports = mongoose.model('Category',categorySchema)