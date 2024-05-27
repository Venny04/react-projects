import User from "../db/models/user.js";


const findUser = async (req, res, next) => {
    try {
        const userTelNumber = Number(req.query?.number);

        if (!userTelNumber) return;
        const user = await User.findOne({ userTelNumber }).select('-userPassword');

        if (!user) return res.status(404).json('Usuario nao encontrado');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json('Error do servidor')
        console.log(error)
    }
}

export { findUser };