require("dotenv")
const jwt= require("jsonwebtoken")
const middleware= (req,res,next)=>{
    try {
        const authHeader= req.headers.token;
        console.log(authHeader);
        const token = authHeader.split(' ')[1]
        console.log(token);
        const decode = jwt.verify(token, `${process.env.TOKEN_KEY}`)
        console.log(token)
        req.userData = decode
        next();
    } catch(error){
        console.log(error);
        res.status(401).json({
            message: "Authentication falied"
        })
    }
}

module.exports = middleware;