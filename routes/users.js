const router = require("express").Router();
const { model } = require("mongoose");
const User = require("../models/User");
const post = require("../models/Post")
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
const middleware= require("../middleware/middlewares")
const cloudinary=require("../happer/cloudinary")
// Update a user
router.put("/update/:id", middleware.middlewarepost,async(req, res)=>{
    const userId=req.userData.user_id
    // const user = await User.findById(userId);
    // const user_id= user._id
    // const username=userN
    console.log(userId);
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
        
        const updateuser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body,
        },{new:true})

          res.status(200).json(updateuser);

    } catch(err){
        res.status(500).json(err);
    }
} else {
    res.status(401).json({
        message:"you can't update other's user account"})
}
});

//DELETE 

router.delete("/delete/:id",middleware.middlewarepost, async(req, res)=>{
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
         res.status(200).json(" User delete")
        
    } catch(err){
          res.status(200).json(err);
    }
    } catch(err){
        res.status(404).json(" User not found")
    }
} else {
    res.status(401).json("you can't delete other user's account")
}
});

// GET A USER

router.get("/:id",middleware.middleware, async(req, res) =>
{ 
    try{
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
} catch(err){
        res.status(500).json(err)
    }
});

router.get("/", middleware.middlewarepost,async(req, res) =>{
    const userId=req.userData.user_id
    const userfind = await User.findById(userId);
    const user_id= userfind._id
    if (user_id==process.env.Admin){
        const user= await User.find()
        res.status(200).json({user})
    }else{
        res.status(401).json("this is for Admin only")
    }
});

module.exports = router;