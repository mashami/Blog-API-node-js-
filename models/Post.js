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
    username:{
        type:String,
        required:true,
    },
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
}, 

    { timestamps: true });

    PostSchema.methods.hasLiked = function (userId) {
        return this.likedBy.indexOf(userId) !== -1;
      };
    
      
      
        module.exports = mongoose.model ("Post", PostSchema);
       