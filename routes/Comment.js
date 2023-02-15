const router = require("express").Router();
const { model } = require("mongoose");
const User = require("../models/User");
const Post = require("../models/Post")
const Comment=require("../models/comment")
const middleware = require("../middleware/middlewares");


router.post("/create/:id",middleware.middleware, async(req, res)=>{
    const userid = req.userData.user_id
    const user = await User.findById(userid);
    const userN = user.username
    const username = userN
    console.log(username)
    const post= await Post.findById(req.params.id)

    // console.log(username)
    
    const newComment = new Comment({
        comment: req.body.comment,
        userId:userid,
        username: username,
        postId:req.params.id,
        
    });
    try {

        
        const saveComment = await newComment.save();

        if (saveComment) {
            post.comment.push(saveComment)
            await post.save();
            return   res.status(200).json(saveComment)

        } else {
            return res.status(401).json()
        }
    } catch (err) {
        return res.status(500).json(err)
    }
})

module.exports=router