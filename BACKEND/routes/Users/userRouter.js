const express= require("express");
const {register,login,getProfile, blockUser, unBlockUser, unblockUser, viewOtherProfile, followingUser, unfollowingUser}=require("../../controllers/Users/userController");
const usersRouter=express.Router();
const isLoggedIn=require("../../middlewares/isLoggedIn");
//register route
usersRouter.post('/register',register);
//login route
usersRouter.post('/login',login);
// get profile route

usersRouter.get('/profile',isLoggedIn,getProfile);
// block user route
usersRouter.put('/block/:userIdToBlock',isLoggedIn,blockUser);

//unnBlock user route
usersRouter.put('/unblock/:userIdToUnblock',isLoggedIn,unblockUser);
//profile view of another user route
usersRouter.get("/view-another-profile/:userProfileId",isLoggedIn,viewOtherProfile);
//follow route
usersRouter.put("/following/:userIdToFollow",isLoggedIn,followingUser);
//unfollow route
usersRouter.put("/unfollowing/:userIdToFollow",isLoggedIn,unfollowingUser);

module.exports=usersRouter;