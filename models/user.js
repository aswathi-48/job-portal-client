import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    first_name: {
        type: String,
        require: true,
    },
    last_name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        default: 'client',
        // enum: ['client', 'admin', 'marketing']
    },
    gender: {
        type: String,
        require: true,
    },
    date_of_birth: {
        type: Date,
        require: true,
    },
    image: {
        type: String,
        default:null
    },
    isdeleted: {
        type:Boolean,
        default:false
    },
    isSubscribed: {
        type: Boolean,
        default:false
    },
    subscriptions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }],
    company: {
        ref : "companies",
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    skill: {
        ref : "skills",
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },

}, { timestamps: true})

const User = mongoose.model("users",UserSchema)

export default User