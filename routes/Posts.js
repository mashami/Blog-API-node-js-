const router = require("express").Router();
const { model } = require("mongoose");
const User = require("../models/User");
const Post = require("../models/Post")
const multer = require("multer");
const middleware= require("../middleware/middlewares")
const cloudinary=require("../happer/cloudinary")

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
      cb(null,"images")
    }, filename(req, file,cb){
        // cb(null, "image2.jpeg"); 
        // cb(null, req.body.name); 
        cb(null,file.originalname)
    },
});

const upload = multer({storage: storage})


// CREATE A POST
router.post("/create",middleware.middlewarepost,upload.single("photo"), async (req, res) => {
    const userId=req.userData.user_id
    const user = await User.findById(userId);
    const userN= user.username
    const username=userN

    console.log(username)
   const result = await cloudinary.uploader.upload(req.file.path)
    const newpost = new Post({
        title:req.body.title,
        desc:req.body.desc,
        photo:result.secure_url,
        // photo:process.env.URL_BLOG+"/images/"+req.file.filename,
        username:username,
        categories:req.body.categories

    });
    try {
        const savePost = await newpost.save();
        if(savePost){
            res.status(200).json(savePost)
        }else{
            res.status(401).json()
        }


        

    } catch (err) {
        res.status(500).json(err)
    }
});

//UPDATE POST
router.put("/update/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatePost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(200).json(updatePost);
            } catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("You can update only your a count")
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
);

//DELETE POST

router.delete("/delete/:id", async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json("post has been deleted..");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("you delete only your post! ")
        }
    } catch (err) {
        // res.status(500).json(err)
        res.status(500).json("you delete only your post! ")
    }
})


// GET A POST

router.get("/:id", async (req, res) => {
    try { 
        const post =await Post.findById(req.params.id);
        res.status(200).json(post);
        
    } catch (err) {
        res.status(500).json(err)
    }
});

// GET ALL POST

router.get("/",middleware.middlewarepost,async (req, res) => {
    const userId=req.userData.user_id
    const user = await User.findById(userId);
    const userN= user.username
    
     req.query.username = userN
    const username=req.query.username
    console.log(username)
    const catName = req.query.cat;
    try { 
        let posts;
        if (username){
            posts = await Post.find({username})
        } else if(catName){
            posts = await Post.find({categories:{
                $in:[catName]
            }});

        }else {
            posts = await Post.find();
        }
        res.status(200).json(posts)
        
    } catch (err) {
        res.status(500).json(err)
    }
});


module.exports = router;