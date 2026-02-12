 const express = require("express")
 const dotenv = require("dotenv")


 //create an express app
 const app = express()
//load the .env>>
 dotenv.config()


 //server start
 const PORT= process.env.PORT||3000 ;
app.listen(PORT, () => {
    console.log("Listening on port: " + PORT);

})