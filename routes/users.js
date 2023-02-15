const router = require("express").Router();
const { model } = require("mongoose");
const User = require("../models/User");
const post = require("../models/Post");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
const middleware= require("../middleware/middlewares")
const cloudinary=require("../happer/cloudinary")
const multer = require("multer");

// Update a user
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

router.put("/update/:id", middleware.middlewarepost, upload.single("profilePicture"),async(req, res)=>{
    const userId=req.userData.user_id
    const user = await User.findById(userId);
    // const user_id= user._id
    // const username=userN
    // console.log(userId);
    if (userId === req.params.id){
        if (req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        if(req.body.username){
            const userna=await User.find({username:req.body.username})
           
            if(userna.length!==0){
                return res.status(402).json({
                    message:"this user name is already used"
                })
            }

        }
    try{
        const result = await cloudinary.uploader.upload(req.file.path)
        const updateuser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body,
            profilePicture: result.secure_url,
        },{new:true})

        return res.status(200).json(updateuser);

    } catch(err){
        return res.status(500).json(err);
    }
} else {
    return res.status(401).json({
        message:"you can't update other's user account"})
}
});

//DELETE  A USER

router.delete("/delete/:id",middleware.middlewareAdmin, async(req, res)=>{
    const userId=req.userData.user_id
    const user = await User.findById(userId);
    const user_id= user._id
    // const username=userN
    console.log(username)
    if (user_id === req.params.id){
    try{
        const user = await User.findById(req.params.id);
    
    try{
        await post.deleteMany({ username: user.username });
         await User.findByIdAndDelete(req.params.id)
         return res.status(200).json(" User delete")
        
    } catch(err){
        return  res.status(200).json(err);
    }
    } catch(err){
        return  res.status(404).json(" User not found")
    }
} else {
    return  res.status(401).json("you can't delete other user's account")
}
});

// GET A USER

router.get("/:id",middleware.middleware, async(req, res) =>
{ 
    try{
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    return res.status(200).json(others);
} catch(err){
    return res.status(500).json(err)
    }
});

router.get("/", middleware.middlewareAdmin,async(req, res) =>{
    try{
        const user = await User.find();
        return res.status(200).json({user})
    }catch(err){
        return res.status(401).json("this is for Admin only")
    }
});

module.exports = router;