require("dotenv")
const jwt= require("jsonwebtoken")
const middleware= (req,res,next)=>{
    try {
        const authHeader= req.headers.token;
        console.log(authHeader);
        const token = authHeader.split(' ')[1]
        console.log(token);
        const decode = jwt.verify(token, `${process.env.TOKEN_KEY}`)
        // console.log(token)
        req.userData = decode 
        // console.log(req.userData)
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

module.exports = { middleware,middlewarepost  };