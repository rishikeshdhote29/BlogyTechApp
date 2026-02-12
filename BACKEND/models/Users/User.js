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
        email: {type: String, required: true,}


    },
    gender: {
        type: String,
        enum: ['male', 'female', 'prefer not to say', 'non-binary'],
    },



);
