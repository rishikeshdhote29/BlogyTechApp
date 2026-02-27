const express = require("express");
const dotenv = require("dotenv");
const {globalErrorHandler,notFoundHnadler} = require("./middlewares/globalerrorHandler");
const userRouter = require("./routes/Users/userRouter");
const connectDB=require('./config/databse')
const categoriesRouter = require("./routes/Categories/categoriesRouter");
const postRouter = require("./routes/Posts/postRouter");
const commentRouter = require("./routes/Comments/commentRouter");
const sendEmail = require("./utils/sendEmail");
// Load environment variables
dotenv.config();

// Create an express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup routes
app.use("/api/v1/users/", userRouter);

app.use("/api/v1/categories", categoriesRouter);

app.use("/api/v1/post", postRouter);

app.use("/api/v1/comments", commentRouter);
// establsiing coonection to mngoose
connectDB();
// setup up the  middle ware
app.use(express.json());

sendEmail("rishikeshdhote2006@gmail.com",'hello babu');


//Not found error handler
app.use(notFoundHnadler);
//setuping global error handler
app.use(globalErrorHandler);
// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
