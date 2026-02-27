const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,

        },
        email: {
            type: String,
            required: true,

        },

        role: {
            type: String,
            required: true,
            enum: ['user', 'admin'],
            default: 'user'
        },
        password: {
            type: String,
            required: true,

        },
        lastLogin: {
            type: Date,
            default: Date.now,

        },
        isVerified: {
            type: Boolean,
            default: false

        },
        accountLevel: {
            type: String,
            enum: ['bronze', 'silver', 'gold'],
            default: 'bronze'
        },
        profilePicture: {
            type: String,
            defaut: ""
        },
        coverImage: {
            type: String,
            defaut: ""
        },
        bio: {
            type: String,

        },
        location: {
            type: String,

        },
        notificationType: {
            email: {type: String}


        },
        gender: {
            type: String,
            enum: ['male', 'female', 'prefer not to say', 'non-binary'],
        },

    profileViwers:[{
            type: mongoose.Schema.Types.ObjectId,ref:"User",

    }],

    followers:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
following:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
blockedUser:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
posts:[{type:mongoose.Schema.Types.ObjectId, ref:"Post"}],
llikedPosts:[{type:mongoose.Schema.Types.ObjectId, ref:"Post"}],

passwordResetToken:{
            type: String,
}    ,
passwordResetExprireas:{type:Date},
    accountVerificationToken:{type:String,default:""},
    accountVerificationExpires:{type:Date},



},
    {timestamps:true},

);
//convert schema to model
const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;

