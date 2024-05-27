import { Router } from 'express';
import { authProfLogin, authProfLogout, getProfChatUsers } from '../controllers/professor.js';
import { verifyToken } from '../verifyToken.js';

const router = Router();




router.post('/auth/login', authProfLogin);
router.post('/auth/logout', authProfLogout);
router.get('/chat-message/users', verifyToken, getProfChatUsers);
export default router;


// lofa_senha : SZbeCmluU;
// lofa_email : joaquim@gmail.com;
// admin_senha: 7qcC_e11u
// admin_email: admin@gmail.com;
// lucamba_senha: Vl-NPegCc;