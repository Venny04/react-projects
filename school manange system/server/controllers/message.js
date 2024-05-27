import Chat from "../db/models/chat.js";
import Message from "../db/models/message.js";
import { getResiveSocketid, io } from "../socket/index.js";


const sendMessage = async (req, res, next) => {
    try {
        const { content } = req.body;
        const receiverID = req.params.id.toString();

        const senderID = req.user._id.toString();
        if (!senderID || !receiverID) return;

        if (senderID == receiverID) return res.status(203).json('voce nao pode enviar sms para ti mesmo');

        let chat = await Chat.findOne({
            chatUsers: { $all: [senderID, receiverID] }
        });

        if (!chat) {
            chat = await Chat.create({
                chatUsers: [senderID, receiverID]
            });
        }
        const message = await Message.create({
            chatID: chat._id,
            senderID,
            receiverID,
            content
        });
        if (message) {
            chat.chatMessages.push(message);
            await chat.save();
        }
        const recevesocktid = getResiveSocketid(receiverID);

        if (recevesocktid) {
            io.to(recevesocktid).emit('message', message);
        }
        res.status(200).json(message);
    } catch (error) {
        next(error);
    }
}

const getMessage = async (req, res, next) => {
    try {
        const receiverID = req.params.id.toString();

        const senderID = req.user._id.toString();
        if (!senderID || !receiverID) return;


        let chat = await Chat.findOne({
            chatUsers: { $all: [senderID, receiverID] }
        }).populate('chatMessages');


        if (!chat) return res.status(404).json({ error: true, message: 'Voce ainda não tem mensagens com esse usuario' });

        res.status(200).json({ error: false, chat });


    } catch (error) {
        console.log(error);
        res.status(200).json({ error: true, message: 'erro no servidor' });
    }
}
export {
    sendMessage,
    getMessage
}