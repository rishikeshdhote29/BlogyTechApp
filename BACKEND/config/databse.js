const mongoose=require('mongoose')
const connectDB= async()=> {
    try{
        await mongoose.connect("mongodb://localhost:27017/bloggytech");
        console.log("MongoDB Connected");
    }catch(e){
        console.error(e);

    }
}
module.exports = connectDB;