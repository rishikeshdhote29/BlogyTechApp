const express = require('express');

const {createPost,fetchAllPosts} = require('../../controllers/posts/postController');
 const isLoggedIn= require('../../middlewares/isLoggedIn');
const {fetchSinglePost,deletePost,updatePost} = require("../../controllers/Posts/postController");
const postRouter = express.Router();
postRouter.post('/',isLoggedIn ,createPost);

postRouter.get('/',fetchAllPosts);

postRouter.get('/:id',fetchSinglePost);

postRouter.delete('/:id',isLoggedIn,deletePost);

postRouter.put('/:id',isLoggedIn,updatePost);


module.exports = postRouter;