const router = require("express").Router();
const User = require ("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
//REGISTER USER

router.post("/register", async(req, res)=>{
    try{
        const salt =await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt)

        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPass,
        });

        const user = await newUser.save();
        res.status(200).json(user);

    }catch(err){
        res.status(500).json(err)
    }
});

//LOGIN USER
// router.post("/login", async(req, res) =>{
//     try{
        // const user =await User.findOne({ username:req.body.username })
//         const validate = await bcrypt.compare(req.body.password, user.password)
//         if( !user || !validate){
//             return res.status(400).json("Wrong credentials!")
//         }else{
//         const { password, ...others } = user._doc;
//         res.status(200).json(others);

//         res.status(200).json(user)
//         console.log(user) 
//         }
//     }catch (err) {
//         res.status(500).json(err)
//     }
// });



router.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
     
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
  
        // user

        
       return res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
   
  });
  
module.exports = router 