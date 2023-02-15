const mongoose = require("mongoose")


const StreetSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
        
    },   
},
{ timestamps: true })

module.exports = mongoose.model ("Street", StreetSchema);