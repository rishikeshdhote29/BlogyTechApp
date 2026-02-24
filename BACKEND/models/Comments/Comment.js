const mongoose = require("mongoose")
const categorySchema = new mongoose.Schema({
        message: {
            type: String,
            required: true,

        },

        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post",
            required: true,
        }

    },
    {timestamps: true},
);
//convert schema to model
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;

