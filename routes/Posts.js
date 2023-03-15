const router = require("express").Router();
const { model } = require("mongoose");
const User = require("../models/User");
const Post = require("../models/Post")
const multer = require("multer");
const middleware = require("../middleware/middlewares")
const cloudinary = require("../happer/cloudinary")

// const PostSchema=require("../models/PostSchema")



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


// CREATE A POST
router.post("/create", middleware.middlewarepost, upload.single("photo"), async (req, res) => {
    try {
        const { title, desc, categories } = req.body
        const user = await User.findById(req.userData.user_id);
        if (!user) return res.status(404).json('user not found')
        const result = await cloudinary.uploader.upload(req.file.path)
        if (!result) return res.status(400).json('photo not uploaded')
        const newPost = await Post.create({ 
            title, 
            desc, 
            categories, 
            photo: result.secure_url,
            username: user.username,
        })
        return res.status(200).json(newPost)
    } catch (error) {
        return res.status(500).json(error)
    }
   
});

//UPDATE POST
router.patch("/update/:id", middleware.middlewarepost, async (req, res) => {
    try {
        const userId = req.userData.user_id
        const user = await User.findById(userId);
        const userN = user.username
        const username = userN

        // console.log(username)


        const post = await Post.findById(req.params.id);
        if (post.username === username || user.role === "admin") {
            try {
                const updatePost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                return res.status(200).json(updatePost);
            } catch (err) {
                return res.status(500).json(err)
            }
        } else {
            return res.status(401).json("You can update only your a count")
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}
);
//LIKES POST

// function hasLiked (userId) {
//     return Post.likedBy.indexOf(userId) !== -1;
//   };



router.patch("/likes/:id", middleware.middlewarepost, async (req, res) => {
    try {
       
        const userId = req.userData.user_id
        // console.log("this is the user Id " + userId)
        const { likedBy } = await Post.findById(req.params.id);

        const post = await Post.findById(req.params.id);

        if (post) {

            if (likedBy.includes(userId)) {

                try {
                    const updatePost = await Post.findByIdAndUpdate(
                        req.params.id,

                        {

                            $pull: { likedBy: userId },
                            $inc: { likes: -1 },

                        },
                        { new: true }
                    )
                    return res.status(200).json(updatePost);
                } catch (err) {
                    console.log(err);
                    return res.status(404).json({ status: "error", err: err.message })
                }
            } else {
                try {
                    const updatePost = await Post.findByIdAndUpdate(
                        req.params.id,
                        {
                            $inc: { likes: 1 },
                            $push: { likedBy: userId }
                        },
                        { new: true }
                    );
                    return res.status(200).json(updatePost);
                } catch (err) {
                    return res.status(404).json(err)
                }
            }
        }

        else {
            return res.status(401).json({ status: "Post not Exits", err: err.message })
        }
    } catch (err) {
        return res.status(500).json({ status: "Server error", err: err.message })
    }
}
);




//DELETE POST

router.delete("/delete/:id", middleware.middlewarepost, async (req, res) => {
    try {
        const userId = req.userData.user_id
        const user = await User.findById(userId);
        const userN = user.username
        const username = userN

        console.log(username)

        const post = await Post.findById(req.params.id);
        if (post.username === username || user.role === "admin") {
            try {
                await post.delete();
                return res.status(200).json("post has been deleted..");
            } catch (err) {
                return res.status(500).json(err);
            }
        } else {
            return res.status(401).json("you delete only your post! ")
        }
    } catch (err) {

        return res.status(500).json(err)
    }
})


//GET ALL POST EXITS IN DATABASE


router.get("/all", async (req, res) => {
    try {
        const post = await Post.find().populate("comment", "comment username");
        return res.status(200).json({ post })
    } catch (err) {
        return res.status(401).json(err)
    }
});



// GET A POST

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("comment", "comment -_id username");
        return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json(err)
    }
});

// GET ALL POST

router.get("/", middleware.middlewarepost, async (req, res) => {
    const userId = req.userData.user_id
    const user = await User.findById(userId);
    const userN = user.username

    req.query.username = userN
    const username = req.query.username
  
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username }).populate("comment", "comment -_id username");
        } else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName]
                }
            });

        } else {
            posts = await Post.find();
        }
        return res.status(200).json(posts)

    } catch (err) {
        return res.status(500).json(err)
    }
});




module.exports = router;