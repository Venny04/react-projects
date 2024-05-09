import Chat from "../db/models/chat.js";

const getUserChat = async (req, res, next) => {
    try {

        const userId = req.user._id;

        let chat = await Chat.find({ users: { $in: [userId] } }).populate('users').populate('messages');

        if (!chat) return res.status(404).json("esse usuario nao tem nenhuma conversa");

        const users = chat.flat().map(chats => chats.users.filter(users => users._id.toString() != userId.toString())
        );


        res.status(200).json({ chat: chat.flat(), users: users.flat() });
    } catch (error) {
        console.log(error)
        res.status(500).json("Error no sistema")
    }
}

export { getUserChat }