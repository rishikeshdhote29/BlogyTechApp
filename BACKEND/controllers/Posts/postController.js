const asyncHandler = require("express-async-handler")
const Post = require("../../models/Posts/Post")
const User = require("../../models/Users/User")
const Category = require("../../models/Categories/Category")

//@desc Create a new post
//@route POST /api/v1/post
//@access private
exports.createPost = asyncHandler(async (req, res, next) => {
	//Get the paylaod
	const {title,content,categoryId}= req.body;

	//Check if the post is present
	const isPresent =await Post.findOne({title});
	if (isPresent) {
		let error= new Error("post is already present");
		next(error);
		return;
		
	}
	//Create the post object
	const postCreated= await Post.create({title,content,category:categoryId,author:req?.userAuth?._id});
	//Update user by adding post in it
	await User.findByIdAndUpdate(req?.userAuth?._id,{$push:{posts:postCreated._id}});
	//Update category adding post in it
	await Category.findByIdAndUpdate(categoryId,{$push:{posts:postCreated._id}});
	

	
	//send the response
	res.json({
		status:"success",
		message:"Post successfully added",
		postCreated
		
	})
	
})
//@desc fetch all  posts
//@route GET /api/v1/post
//@access Public


exports.fetchAllPosts=asyncHandler(async(req,res,next)=>{
	 const allPosts=	await Post.find();
	 res.json({
		 status:"success",
		 message:"All posts have been successfully",
		 posts:allPosts
	 })


})
//@desc fetch single  posts
//@route GET /api/v1/post/:id
//@access Public
exports.fetchSinglePost = asyncHandler(async (req, res, next) => {
	const postId = req.params.id;
	const post = await Post.findById(postId);
	if (post) {
		
		
		res.json({
			status: "success",
			message: "Post fetched successfully",
			post: post
		})
	}
	 else {
		res.json({
			status: "success",
			message: "no post availble for given id",
		})
	
	
	}
})
//@desc delete posts
//@route DELETE /api/v1/post/:id
//@access private

exports.deletePost = asyncHandler(async (req, res, next) => {
	const postId = req.params.id;
	const post = await Post.findByIdAndDelete(postId);
	if (post) {
		
		
		res.json({
			status: "success",
			message: "Post Deleted successfully",
			post: post
		})
	}
	 else {
		res.json({
			status: "success",
			message: "no post availble for given id",
		})
	
	
	}
})

//@desc update  posts
//@route PUT /api/v1/post/:id
//@access private

exports.updatePost = asyncHandler(async (req, res, next) => {
	const postId = req.params.id;
	const post=req.body;
	const updatedPost = await Post.findByIdAndUpdate(postId,post,{new:true,runValidators:true});

		
		
		res.json({
			status: "success",
			message: "Post updaed successfully",
			updatedPost
		})
	
	
	 
	
	
	
})

