import Chat from "../db/models/chat.js";


const getMyChats = async (req, res, next) => {
    try {
        const userID = req.user._id;

        const chats = await Chat.find({
            chatUsers: { $in: [userID] },
        }).populate('chatUsers').populate('chatMessages') || [];


        const data = chats.map((chat) => chat.chatUsers.filter(element => element._id.toString() != userID));

        await res.status(200).json(data);

    } catch (error) {
        next(error);
    }
}

const getChats = async () => { }
export { getMyChats, getChats }