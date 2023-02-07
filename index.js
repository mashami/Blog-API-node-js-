const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const UserRoute = require("./routes/users");
const Postoute = require("./routes/Posts");
const CategoryRouter = require("./routes/Categories");
const multer = require("multer")
const swaggerDocumention= require("./happer/documentations")
const { MONGO_URI } = process.env;

dotenv.config();

require('dotenv').config()

app.use(express.json());
app.use("/images",express.static("./images"))



mongoose.set('strictQuery', true);
// console,log()
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //listening to server

        app.listen(process.env.API_PORT, () => {
            console.log("Connected to MangoDB $ Server Its listening on port", process.env.API_PORT)
            
        // const storage = multer.diskStorage({
        //     destination:(req,file,cb) => {
        //       cb(null,"images")
        //     }, filename(req, file,cb){
        //         cb(null, "image2.jpeg"); 
        //         // cb(null, req.body.name); 
        //     },
        // });
        // const upload = multer({storage: storage});
        // app.post("/api/uplaod", upload.single("file"),(req, res)=>{
        //     res.status (200).json("file has been uploaded");
        // })
        
    })
}).catch(error => console.log(error.message));
        //middleware
        app.use(express.json())

       
       
        app.use((req, res, next) => {
            console.log(req.path, req.method)
            next();
        })

        app.use("/api/auth", authRoute);
        app.use("/api/user", UserRoute);
        app.use("/api/post",Postoute );
        app.use("/api/category",CategoryRouter );
        
        swaggerDocumention(app);