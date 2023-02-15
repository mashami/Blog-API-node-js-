const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
   
    title:{
        type:String,
        required: true,
        unique: true
    },
    desc: {
        type:String,
        required:true,

    },
    photo:{
        type:String,
        required:false,
    },
    // username:{
    //     type:String,
    //     required:true,
    // },
    categories:{
        type:Array,
        required:false
    },
    likes:{
        type:Number,
        required:false,
        default:0,
    },
      likedBy: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        default: 'None'
      }],
      comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",
        default: 'None'
      }],

  
}, 

    { timestamps: true });

   
      
      
        module.exports = mongoose.model ("Post", PostSchema);
       