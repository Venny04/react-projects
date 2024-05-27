import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema({
    chatID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chats',
        required: true
    },

    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    receiverID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    isRead: {
        type: Boolean,
        required: true,
        default: false
    },
    isView: {
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