const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true

    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    comment:{
        type:String,
        required:true,
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    
    
},
{ timestamps: true })

module.exports = mongoose.model ("Comment", CommentSchema);