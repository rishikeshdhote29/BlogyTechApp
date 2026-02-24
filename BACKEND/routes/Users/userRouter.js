const express= require("express");
const {register,login,getProfile}=require("../../controllers/Users/userController");
const usersRouter=express.Router();
const isLoggedIn=require("../../middlewares/isLoggedIn");
//register route
usersRouter.post('/register',register);
//login route
usersRouter.post('/login',login);
// get profile route

usersRouter.get('/profile',isLoggedIn,getProfile);


module.exports=usersRouter;