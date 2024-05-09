import Chat from "../db/models/chat.js";
import Message from "../db/models/messages.js";
import { getResiveSocketid, io } from "../socket/index.js";

const sendMessage = async (req, res, next) => {
    try {
        const { content } = req.body;
        const receiverID = req.params.id;

        const senderID = req.user._id;

        let chat = await Chat.findOne({
            users: { $all: [senderID, receiverID] }
        });

        if (!chat) {
            chat = await Chat.create({
                users: [senderID, receiverID]
            });
        }
        const message = await Message.create({
            chatID: chat._id,
            content,
            senderID,
            receiverID
        });

        if (message) {
            chat.messages.push(message);
            chat.save();
        }
        const receiver = getResiveSocketid(receiverID);

        if (receiver) {
            io.to(receiver).emit('message', message);
        }

        res.status(200).json(message);
    } catch (error) {
        console.log(error)
        res.status(500).json("Error no sistema")
    }
}

const getCurrentUserMessages = async (req, res, next) => {
    try {
        const receiverID = req.params.id;

        const senderID = req.user._id;

        let chat = await Chat.findOne({
            users: { $all: [senderID, receiverID] }
        }).populate('messages');

        if (!chat) return res.status(404).json([]);

        res.status(200).json(chat?.messages);

    } catch (error) {
        console.log(error)
        res.status(500).json('Erros do servidor');
    }

}


const updateMessage = async (req, res, next) => {
    try {
        const sender = req.params.id;

        const receiver = req.user._id;

        const messageId = req.body.messageId;

        let message = await Message.findById(messageId);
        if (!message) return;


        if (sender === message?.senderID.toString() || receiver === message?.receiverID.toString()) {
            const message = await Message.findByIdAndUpdate(messageId, { isRead: true }, { new: true });
            return res.status(200).json(message)
        }

    } catch (error) {
        console.log(error)
        res.status(500).json('Erros do servidor');
    }

}

export { sendMessage, getCurrentUserMessages, updateMessage }