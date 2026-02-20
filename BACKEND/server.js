const express = require("express")
const dotenv = require("dotenv")
const categoriesRouter = require("./routes/Categories/categoriesRouter")

//create an express app
const app = express()
//load the .env>>
dotenv.config()

//middleware
app.use(express.json())

//routes
app.use("/api/categories", categoriesRouter)

//server start
const PORT= process.env.PORT||3000 ;
app.listen(PORT, () => {
    console.log("Listening on port: " + PORT);

})
