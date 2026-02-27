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



//@desc Block  User
// @route PUT /api/v1/users/block/userIdToBlock
//@access private
exports.blockUser=asyncHandler(async (req,res,next)=>{
    //Find the userId to  be blocked
    const userIdToBlock=req.params.userIdToBlock;
    //check whether  the uesr is present in DB or not
    const userToBlock= await User.findById(userIdToBlock);
    if(!userToBlock){
        let error= new Error("User not found");
        next(error);
        return;
        
    }
    // Get the current user id
    const userBlocking= req?.userAuth?._id;
    
    // check if it is self blocking
    if(userBlocking.toString()===userIdToBlock.toString()){
        const error = new Error("can not block yourself")
        next(error);
        return;
        
        
    }
    //get the current user  object form DB
    const currentUser= await User.findById(userBlocking);
    //check whether the uyserIdToBlock is already blocked
    if(currentUser.blockedUser.includes(userIdToBlock)){
        const error = new Error("user aleardy blocked")
        
        next(error);
        return;
        
    }
    
    //push the user to bne blockedn the blockedUser array
    currentUser.blockedUser.push(userIdToBlock);
    await currentUser.save();
       res.json({
            status: "success",
            message: "User blocked succesfully"
        })
    
})
//@desc UnBlock  User
// @route PUT /api/v1/users/unblock/userIdToUnblock
//@access private

exports.unblockUser=asyncHandler(async (req,res,next)=>{
    //Find the userId to  be unBlocked
    const userIdToUnblock=req.params.userIdToUnblock;
    //check whether  the uesr is present in DB or not
    const userToUnblock= await User.findById(userIdToUnblock);
    console.log(userToUnblock);
    if(!userToUnblock){
        let error= new Error("User not found");
        next(error);
        return;
        
    }
    // Get the current user id
    const userUnblocking= req?.userAuth?._id;
    
    //get the current user  object form DB
    const currentUser= await User.findById(userUnblocking);
   //check wheter the user is blocked is not
    const isAvailable= currentUser.blockedUser.includes(userIdToUnblock);
    if(!isAvailable){
        const error = new Error("user is not blocked")
        
        next(error);
        return;
        
    }
    
    //Remove the user from blockedUser array using filter to handle ObjectId comparison
    currentUser.blockedUser = currentUser.blockedUser.filter(
        id => id.toString() !== userIdToUnblock
    );
  
    await currentUser.save();
       res.json({
            status: "success",
            message: "User Unblocked succesfully"
        })
    
})
//@desc View another user profile
// @route GET /api/v1/users/view_another_profile/:userProfileId
//@access private
exports.viewOtherProfile=asyncHandler(async (req,res,next)=>{
    //get the userId whose profile is to be views
    
    const userProfileId=req.params.userProfileId;
   
    const userProfile= await User.findById(userProfileId);

    if(!userProfile){
        let error= new Error("User not found");
        next(error);
        return;
        
    }
    //geting the current user
     const currentUserId= req?.userAuth?._id;
    // chewck if we have already view the profle of userProfile
       if(userProfile.profileViwers.includes(currentUserId)){
        const error = new Error("you have aleardy view the profile")
        
        next(error);
        return;}
       
       //push the currentUserId into the array od userProfile;
    userProfile.profileViwers.push(currentUserId);
       await userProfile.save();
       res.json({
           status: "success",
           message:"User Profile viwed successfully",
       })
        
    
})


//@desc Follow user
//@route PUT /api/v1/user/following/:userIdToFollow
//@access private
exports.followingUser=asyncHandler(async(req,res,next)=>{
    //the uesr to be followed
    const userToFollow=req.params.userIdToFollow;
    //find the current user id
    const currentUserId=req?.userAuth?._id;
    const currentUserProfile=await User.findById(userToFollow);
    if(!currentUserProfile){
        let error = new Error("user not found");
        next(error);
        return;
    }
  //Avoiding user to self follow
    if(currentUserId.toString()===userToFollow.toString()){
        const error = new Error("user tries to follow himself");
        next(error);
        return;
    }
    //Push the id to of userToFollow inside following array of the current user
    await User.findByIdAndUpdate(
        currentUserId,{
            $addToSet:{following:userToFollow}
        },{new: true}
    );
    //push the current user id into the follow array of userToFollow
    await User.findByIdAndUpdate(
        userToFollow,{
            $addToSet:{followers:currentUserId}
        },{new: true})
    
    // send the response
    res.json({
        status: "success",
        message:"User follow successfully",
        
    })
})

//@desc unFollow user
//@route PUT /api/v1/user/following/:userIdToUnFollow
//@access private
exports.unfollowingUser=asyncHandler(async(req,res,next)=>{
    //the uesr to be followed
    const userToUnFollow=req.params.userIdToFollow;
    //find the current user id
    const currentUserId=req?.userAuth?._id;
    //check wheter uset is exists
    const currentUserProfile=await User.findById(userToUnFollow);
    if(!currentUserProfile){
        let error = new Error("user not found");
        next(error);
        return;
    }
  //Avoiding user to self Unfollow
    if(currentUserId.toString()===userToUnFollow.toString()){
        const error = new Error("user tries to Unfollow himself");
        next(error);
        return;
    }
    //check whete user to be unfollolwe isfollowed or not
   
    const currentUserObj= await User.findById(currentUserId);
    
   if(! currentUserObj.following.includes(userToUnFollow)){
        const error = new Error("user tries to Unfollow which is not followed by him");
        next(error);
        return;
   }
    //Remove the userIdToUnFollow from the following array
    await User.findByIdAndUpdate(currentUserId,{$pull:{following:userToUnFollow}},{new: true})
    //Remove the currentUserId from the followers array
    await User.findByIdAndUpdate(userToUnFollow,{$pull:{followers:currentUserId}},{new: true})
    
    // send the response
    res.json({
        status: "success",
        message:"User Unfollow successfully",
        
    })
})
