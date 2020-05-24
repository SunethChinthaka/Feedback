const mongoose=require('mongoose')
//model
const Comment=mongoose.model('Comment',{
    message:{type:String},
    rating:{type:Number}
})
module.exports={Comment}