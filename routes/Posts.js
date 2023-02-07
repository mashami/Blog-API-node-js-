const router = require("express").Router();
const { model } = require("mongoose");
const User = require("../models/User");
const Post = require("../models/Post")
const multer = require("multer");
const middleware= require("../middleware/middlewares")

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
router.post("/create",middleware,upload.single("photo"), async (req, res) => {
    const newpost = new Post({
        title:req.body.title,
        desc:req.body.desc,
        photo:process.env.URL_BLOG+"/images/"+req.file.filename,
        username:req.body.username,
        categories:req.body.categories

    });
    try {
        const savePost = await newpost.save();

        res.status(200).json(savePost)

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

router.get("/", async (req, res) => {
    const username = req.query.username;
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