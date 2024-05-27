import mongoose from "mongoose";

const { Schema } = mongoose;

const chatSchema = new Schema({
    chatUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Professores",
            required: true,
        }
    ],
    chatMessages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Messages",
            default: []
        }
    ],

}, { timestamps: true });


const Chat = mongoose.model('Chats', chatSchema);
export default Chat