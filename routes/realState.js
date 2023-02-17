const router = require("express").Router();
const { model } = require("mongoose");
const User = require("../models/User");

const multer = require("multer");
const middleware = require("../middleware/middlewares")
const cloudinary = require("../happer/cloudinary");
const realState = require("../models/realState");
const uuid = require('uuid'); 



router.get("/all", async (req, res) => {

    try {
        const realstate = await realState.find();

        if (realstate) {
            return res.status(200).json({ realstate })
        } else {
            return res.status(404).json({
                message: "NO REAL STATES"
            })
        }
    } catch (err) {
        return res.status(401).json(err)
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
router.post("/create", middleware.middlewareAdmin, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'profilePicture', maxCount: 1 }]), async (req, res) => {
    const userId = req.userData.user_id
    const user = await User.findById(userId);
    const userN = user.username

    // const username = userN

    // console.log(username)
    // console.log(req.files)
    console.log("start")
    const result = await cloudinary.uploader.upload(req.files.image[0].path)
    const result1 = await cloudinary.uploader.upload(req.files.profilePicture[0].path)
    console.log("End")
    const newRealState = new realState({
        title: req.body.title,
        location: req.body.location,
        price: req.body.price,
        image: result.secure_url,
        // photo:process.env.URL_BLOG+"/images/"+req.file.filename,
        beds: req.body.beds,
        bath: req.body.bath,
        yearbuilt: req.body.yearbuilt,
        lotsize: req.body.lotsize,
        Status: req.body.Status,
        profilePicture: result1.secure_url, 
        offerBy: req.body.offerBy,
        SqFt: req.body.SqFt,
        Description: req.body.Description,

    });
    try {
        const saveRealState = await newRealState.save();
        console.log(saveRealState)
        if (saveRealState) {
            return res.status(200).json(saveRealState)
        } else {
            return res.status(401).json()
        }
    } catch (err) {
        return res.status(500).json(err)
    }
});

// DELETE Real State

router.delete("/delete/:id", async (req, res) => {
    try {
        
        const realstate = await realState.findById(req.params.id);
        
            try {
                await realstate.delete();
                return res.status(200).json("real State has been deleted..");
            } catch (err) {
                return res.status(400).json({
                    message:"the real state is not exit"
                });
            }
        
    } catch (err) {

        return res.status(500).json(err)
    }
})

// GET A Real State

router.get("/:id", async (req, res) => {
    try {
        const realstate = await realState.findById(req.params.id)//.populate("likedBy", "");
        if (realstate){
        return res.status(200).json(realstate);
        }else{
            return res.status(404).json({
                message:"Doesn't exits"
            });
        }
    } catch (err) {
        return res.status(500).json(err)
    }
});

//UPDATE Real State
router.patch("/update/:id", middleware.middlewareAdmin, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'profilePicture', maxCount: 1 }]), async (req, res) => {

    try {

        const realstate = await realState.findById(req.params.id);
        if (realstate) {
            try {
                console.log(req.body);
                const updaterealstate = await realState.findByIdAndUpdate(

                    req.params.id,

                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                return res.status(200).json(updaterealstate);
            } catch (err) {
                return res.status(404).json({
                    message: "not found"
                })
            }
        } else {
            return res.status(400).json({
                message: "not found"
            })
        }

    } catch (err) {
        return res.status(500).json(err)
    }
}
);

router.patch("/likes/:id" ,middleware.anonymousAuth,async (req, res) => {
    
    const userId = uuid.v4();
    console.log(userId.toString())
          try {
                    const updateRealStateById = await realState.findByIdAndUpdate(
                        req.params.id,
                        {
                            $inc: { likes: 1 },
                            
                        },
                        { new: true }
                    );
                    return res.status(200).json(updateRealStateById);
                } catch (err) {
                    return res.status(404).json(err)
                }
            })
  

module.exports = router;