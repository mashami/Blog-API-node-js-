const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const realStateSchema = new mongoose.Schema({

    location: {
        province: {
            type: String,
            default: ''

        },
        district: {
            type: String,
            default: ''

        },
        street: {
            type: String,
            default: ''

        }

    },
    price: {
        type: String,
        required: true,

    },
    image: {
        type: String,
        required: false,
    },
    beds: {
        type: Number,
        required: true,
    },
    bath: {
        type: Number,
        required: false
    },
    yearbuilt: {
        type: String,
        required: false

    },
    SqFt:{
        type:Number,
        required:false,
        default:0
    },
    offerBy:{
        type:String,
        default:"",
        required:true
    },
    lotsize: {
        type: Number,
        required: true
    },
    Status: {
        type: String,
        required: true

    },
    Description: {
        type: String,
        required: false
    },
   
    profilePicture: {
        type: String,
        required: false,
    },
    


},

    { timestamps: true });


module.exports = mongoose.model("RealState", realStateSchema);
