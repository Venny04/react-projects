import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema({
    chatID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },

    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Professores',
        required: true
    },
    receiverID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Professores',
        required: true
    },
    isRead: {
        type: Boolean,
        required: true,
        default: false
    },
    content: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Message = mongoose.model('Messages', messageSchema);

export default Message;