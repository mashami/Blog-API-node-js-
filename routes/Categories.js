const router = require("express").Router();

const Category = require("../models/Category");
const middleware = require("../middleware/middlewares")

// POST CATEGORY
router.post("/create/",middleware.middlewareAdmin,async(req, res) =>{
    const newcat = new Category(req.body);
    try {
        const saveCat = await newcat.save();
        res.status(200).json(saveCat);

    }catch (err){
        res.status(500).json(err)
    }
});

// GET ALL CATEGORIES
router.get("/",async(req, res) =>{
   
    try {
        const category = await Category.find();
        res.status(200).json(category);

    }catch (err){
        res.status(500).json(err)
    }
});

module.exports = router;