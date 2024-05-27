import jwt from "jsonwebtoken";
import Professor from "./db/models/professor.js";

const verifyToken = async (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: 401, message: 'Token não existe' });
        }

        const verify = jwt.verify(token, process.env.JWT);
        if (!verify) {
            return res.status(401).json({ error: 401, message: 'Token inválido.' });
        }

        const user = await Professor.findById(verify.userId).select('-senha');
        if (!user) {
            return res.status(404).json({ error: 404, message: 'Usuário não encontrado.' });
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

export { verifyToken };

// LP, Matematetica, BIOlogia , ed fisica, fisica, educao manuel e platica, quimica, historia,Ingles, geografia , educao moral e civica  