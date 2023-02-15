const router = require("express").Router();
const { model } = require("mongoose");
const User = require("../models/User");
const RealState=require("../models/realState")
const multer = require("multer");
const middleware = require("../middleware/middlewares")
const cloudinary = require("../happer/cloudinary");
const realState = require("../models/realState");


router.get("/all",async(req, res) =>{
    
    try{
        const realstate = await realState.find();
       
        if(realstate){
        return  res.status(200).json({realstate})
        }else{
            return res.status(404).json({
                message:"NO REAL STATES"
            })
        }
    }catch(err){
        return  res.status(401).json(err)
    }
});



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    }, filename(req, file, cb) {
        // cb(null, "image2.jpeg"); 
        // cb(null, req.body.name); 
        cb(null, file.originalname)
    },
});

const upload = multer({ storage: storage })


// CREATE A Real State
router.post("/create", middleware.middlewareAdmin, upload.fields([{name:'image',maxCount:1},{name:'profilePicture', maxCount:1}]), async (req, res) => {
    const userId = req.userData.user_id
    const user = await User.findById(userId);
    const userN = user.username
    
    const username = userN

    // console.log(username)
    console.log(req.files)
    const result = await cloudinary.uploader.upload(req.files.image[0].path)
    const result1 = await cloudinary.uploader.upload(req.files.profilePicture[0].path)
    const newRealState = new RealState({
        location: req.body.location,
        price: req.body.price,
        image: result.secure_url,
        // photo:process.env.URL_BLOG+"/images/"+req.file.filename,
        beds: req.body.beds,
        bath: req.body.bath,
        yearbuilt:req.body.yearbuilt,
        lotsize:req.body.lotsize,
        Status:req.body.Status,
        profilePicture:result1.secure_url,
        offerBy:req.body.offerBy,
        SqFt:req.body.SqFt,
        Description:req.body.Description,
        
    });
    try {
        const saveRealState = await newRealState.save();
        if (saveRealState) {
            return   res.status(200).json(saveRealState)
        } else {
            return  res.status(401).json()
        }
    } catch (err) {
        return res.status(500).json(err)
    }
});



module.exports = router;