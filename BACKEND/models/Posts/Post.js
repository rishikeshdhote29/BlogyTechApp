const mongoose = require("mongoose")
const postSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,

        },
        image: {
            type: String,
           default:''

        },
    claps:{
            type: Number,
default:0
    },
    content: {
            type: String,
        required: true

    },
    author: {
            type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    shares:{
            type: Number,
        default:0
    },
    postViews:{
            type: Number,
        default:0
    },
    category:{
            type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required: true

    },
    schedualedPulished:{
            type: Date,
        default:null,
    },
    like:[{
            type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    comment:[{
            type:mongoose.Schema.Types.ObjectId,
        ref:'Comments',
    }]
},
    {timestamps:true},

);
//convert schema to model
const Post= mongoose.model("Post",postSchema);
module.exports = Post;

