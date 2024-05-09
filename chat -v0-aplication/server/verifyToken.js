import jwt from "jsonwebtoken";
import User from "./db/models/user.js";

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]

        if (!token) {
            return res.status(401).json({ error: "Voce Precisa estar Cadastrado." });
        }

        const verify = jwt.verify(token, process.env.JWT);

        if (!verify) {
            return res.status(401).json('Token inválido.');
        }

        const user = await User.findById(verify.userId).select('-password');

        if (!user) {
            return res.status(404).json('Usuário não encontrado.');
        }

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
};

export { verifyToken };