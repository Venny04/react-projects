import mongoose from "mongoose";



const { model, Schema } = mongoose


const chatSchema = new Schema({
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Messages',
            default: []
        }
    ],
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
        }
    ]

}, { timestamps: true });


const Chat = model('Chat', chatSchema);

export default Chat;