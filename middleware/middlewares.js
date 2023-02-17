require("dotenv")
const uuid = require('uuid'); 
const jwt= require("jsonwebtoken")
const User=require("../models/User")
const cookieParser = require('cookie-parser');
const middleware= (req,res,next)=>{
    try {
        const authHeader= req.headers.token || req.headers.authorization;
        
        const token = authHeader.split(' ')[1]
        console.log(token)
        const decode = jwt.verify(token, `${process.env.TOKEN_KEY}`)
        
        req.userData = decode 
    
        next();
    } catch(error){
        console.log(error);
        return res.status(401).json({
            message: "Authentication falied"
        })
    }
}

const middlewarepost= (req,res,next)=>{
    try {
        console.log(req.headers)
        const authHeader= req.headers.token || req.headers.authorization;
        const token = authHeader.split(' ')[1]
        const decode = jwt.verify(token, `${process.env.TOKEN_KEY}`)
        // console.log(token)
        req.userData = decode
        // console.log(req.userData)
        
        next();
    } catch(error){
        console.log(error);
        return res.status(401).json({
            message: "Authentication falied"
        })
    }
}
const middlewareAdmin= async (req,res,next)=>{
    try {
        const authHeader= req.headers.token || req.headers.authorization;
        
        const token = authHeader.split(' ')[1]
        console.log(token)
        const decode = jwt.verify(token, `${process.env.TOKEN_KEY}`)
        
        req.userData = decode
       const userid=req.userData.user_id
        const user = await User.findById(userid);
        if(user.role==="admin") {
            console.log("admitted")
        next();
        }else{
            
            return res.status(402).json({
                message:"you are not Authorized"
            })
        }
    } catch(error){
        console.log(error);
        return res.status(401).json({
            message: "Authentication falied"
        })
    }

}

function anonymousAuth(req, res, next) {
    if (!req.cookies.userId) {

        const userId = uuid.v4();

          console.log( res.cookie('userId', userId, { httpOnly: true }))
       res.cookie('userId', userId, { httpOnly: true })
      next();
    }else{
    // call the next middleware function in the stack
    return res.status(200).json({
        message:"a user already like this post"
        
       })
    
    }
  }

module.exports = { middleware,middlewarepost, middlewareAdmin, anonymousAuth };