const bcrypt = require("bcrypt");
const generateToken= require("../../utils/generateToken");
const User=require("../../models/Users/user")
const asyncHandler=require("express-async-handler");

//@desc Regsiter new user
//@route POST /api/v1/users/register
//@access public

const saltRounds = 10;

exports.register= asyncHandler(async (req, res,next) => {
 
        const {username,password,email} = req.body;
        const userObj=await User.findOne({username});
        if(userObj){
            throw new Error("User already exists");
        }
      const newUser=  new User({username,email,password})
        const salt = await bcrypt.genSalt(10);

             newUser.password= await bcrypt.hash(password,salt);
        await newUser.save();
        res.json({
            status:"success",
            message:"user resgistered succesfully",

            _id:newUser?.id,
            username:newUser?.username,
            email:newUser?.email,
            role:newUser?.role,
        })


})






//@desc login  user
//@route POST /api/v1/users/login
//@access public
exports.login= asyncHandler(async (req,res,next)=> {
    
    
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if (!user) {
        throw new Error("invalid credentials");
    }
    
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("invalid credentials");
        
    }
    user.lastLogin = new Date()
    await user.save();
    res.json({
        status: "success",
        email: user?.email,
        username: user?.username,
        role: user?.role,
        token: generateToken(user),
        
    })
    
    
})
//@desc profile view
//@route POST /api/v1/users/profile/:id
//@access private

exports.getProfile= asyncHandler(async (req,res,next)=> {
    
    
        const user = await User.findById(req.userAuth.id)
        res.json({
            status: "success",
            message: "Profile fetched",
            user
        })
    }
)