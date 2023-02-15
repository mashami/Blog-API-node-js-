const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const realStateSchema = new mongoose.Schema({
   
    location:{
        province: {
        type: Schema.Types.ObjectId,
        ref: "Provide",
        default: 'None'
    
        },
        district: {
            type: Schema.Types.ObjectId,
            ref: "Distrist",
            default: 'None'
        
        },
        street: {
            type: Schema.Types.ObjectId,
            ref: "Street",
            default: 'None'
            
        }
        
    },
    price: {
        type:String,
        required:true,

    },
    image:{
        type:String,
        required:false,
    },
    beds:{
        type:Number,
        required:true,
    },
    bath:{
        type:Number,
        required:false
    },
    yearbuilt:{
        type:Number,
        required:false
    },
    lotsize:{
        type:Number,
        required:true
    },
    Status:{
        type:String,
        required:true
        
    },
    Description:{
        type:String,
        required:false
    },
    
}, 

    { timestamps: true });

    
    module.exports = mongoose.model ("RealState", realStateSchema);
       