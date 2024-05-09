import bcrypt from 'bcrypt';

import User from "../db/models/user.js";
import { getToken } from "../getToken.js";

const createAccount = async (req, res, next) => {
    try {

        // const telNumber = await User.find({userTelNumber:req.body.userTelNumber});
        // const emali = await User.find({userEmail:req.body.userEmail});

        // if(telNumber) return res.status(401).json('Esta numero ja se encontra cadastrado no nosso sistema');

        // if(emali ) return res.status(401).json('Esta numero ja se encontra cadastrado no nosso sistema')

        const hash = await bcrypt.genSalt(10);

        const password = await bcrypt.hash(req.body.userPassword, hash);

        const user = await User.create({ ...req.body, userPassword: password });

        if (!user) return res.status(401).json('erro ou criar usuario');

        const token = await getToken(user._id, res);
        const { userPassword, ...user_doc } = user._doc;

        res.status(200).json({ user_doc, token });

    } catch (error) {
        res.status(500).json({ error: "Erro do sistema" });
        console.log(error)
    }
}

const login = async (req, res, next) => {
    try {
        const email = req.body.userEmail;
        const password = req.body.userPassword;

        console.log(email, password)
        const user = await User.findOne({
            userEmail: email
        });

        if (!user) return res.status(404).json('esse usuario nao existe');


        const verifyPassword = await bcrypt.compare(password, user.userPassword);

        if (!verifyPassword) {
            return res.status(401).json({ error: 'Senha incorreta.' });
        }
        const token = await getToken(user._id, res);

        const { userPassword, ...doc } = user._doc;

        res.status(200).json({ doc, token });

    } catch (error) {
        res.status(500).json({ error: "Erro do sistema" });
        console.log(error)
    }
}



export { login, createAccount };