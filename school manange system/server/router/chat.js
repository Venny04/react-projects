import express from 'express';

import { getMyChats, getChats } from '../controllers/chat.js';
import { verifyToken } from '../verifyToken.js';


const router = express.Router();

router.get('/get/my', verifyToken, getMyChats);
router.get('/get/chats', verifyToken, getChats);


export default router;