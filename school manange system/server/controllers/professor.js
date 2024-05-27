import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import Professor from "../db/models/professor.js";



const authProfLogin = async (req, res, next) => {
    try {
        const professor = await Professor.findOne({
            email: req.body.email
        });

        if (!professor) {
            return res.status(404).json({ error: 404, message: 'Usuário não encontrado.' });
        }

        const passwordMatch = await bcrypt.compare(req.body.senha, professor.senha);

        if (!passwordMatch) {
            return res.status(401).json({ error: 401, message: 'Credenciais inválidas.' });
        }

        // const token = jwt.sign({ userId: professor._id }, process.env.JWT, { expiresIn: '2h' });
        const token = jwt.sign({ userId: professor._id }, process.env.JWT);

        const { senha, ...doc } = professor._doc;

        res.status(200).json({ user: doc, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 500, message: error.message });
    }
};


const authProfLogout = async (req, res, next) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 500, message: error.message });
    }
}

const getProfChatUsers = async (req, res, nest) => {
    try {
        const userId = req.user._id;
        if (!userId) return

        console.log(userId)

        const users = await Professor.find({ _id: { $ne: userId } });

        if (!users) return res.status(404).json({ error: true, message: "Voce ainda não tem nenhuma mensagem." });

        res.status(200).json({ error: false, users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 500, message: "erro no servidor" });
    }
}

export { authProfLogin, authProfLogout, getProfChatUsers }