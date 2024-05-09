import mongoose from "mongoose";



const { model, Schema } = mongoose


const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    userTelNumber: {
        type: Number,
        required: true,
        unique: true
    },
    userPassword: {
        type: String,
        required: true
    },
    userAvatar: {
        type: String,
    },
    userBio: {
        type: String
    },


}, { timestamps: true });


const User = model('Users', userSchema);

export default User;