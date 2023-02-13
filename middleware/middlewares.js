require("dotenv")
const jwt= require("jsonwebtoken")
const middleware= (req,res,next)=>{
    try {
        const authHeader= req.headers.token;
        
        const token = authHeader.split(' ')[1]
        
        const decode = jwt.verify(token, `${process.env.TOKEN_KEY}`)
        
        req.userData = decode 
    
        next();
    } catch(error){
        console.log(error);
        res.status(401).json({
            message: "Authentication falied"
        })
    }
}

const middlewarepost= (req,res,next)=>{
    try {
        const authHeader= req.headers.token;
        const token = authHeader.split(' ')[1]
        const decode = jwt.verify(token, `${process.env.TOKEN_KEY}`)
        console.log(token)
        req.userData = decode
        console.log(req.userData)
        
        next();
    } catch(error){
        console.log(error);
        res.status(401).json({
            message: "Authentication falied"
        })
    }
}
const middlewareAdmin= (req,res,next)=>{
    try {
        middleware(req, res,() =>{
         if(decode.role==="admin"){
            next()
         }else{
            res.status(401).json({
                message:"you are not Authorized to this task"
            })
         }
        })
}catch(err){
    res.status(500).json(err)
}
}
module.exports = { middleware,middlewarepost, middlewareAdmin };