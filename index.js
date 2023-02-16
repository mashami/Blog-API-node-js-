const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const UserRoute = require("./routes/users");
const Postoute = require("./routes/Posts");
const CategoryRouter = require("./routes/Categories");
const commentRouter = require("./routes/Comment")
const multer = require("multer")
const swaggerDocumention = require("./happer/documentations")
const { MONGO_URI } = process.env;
const cors = require('cors');
const realState = require("./routes/realState");
const boyParser = require("body-parser");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const uuid = require('uuid'); // import the uuid package

dotenv.config();

require('dotenv').config()

app.use(express.json());
app.use("/images", express.static("./images"))

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}));

mongoose.set('strictQuery', true);
// console,log()
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listening to server

        app.listen(process.env.API_PORT, () => {
            console.log("Connected to MangoDB $ Server Its listening on port", process.env.API_PORT)



        })
    }).catch(error => console.log(error.message));
//middleware
app.use(express.json())



app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
})
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/api/auth", authRoute);
app.use("/api/user", UserRoute);
app.use("/api/post", Postoute);
app.use("/api/category", CategoryRouter);
app.use("/api/comment", commentRouter);
app.use("/api/realstate", realState);


swaggerDocumention(app);