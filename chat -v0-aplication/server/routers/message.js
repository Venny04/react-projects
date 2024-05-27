import express from 'express';
import { getCurrentUserMessages, sendMessage, typing, updateMessage } from '../controllers/message.js';
import { verifyToken } from '../verifyToken.js';


const { Router } = express


const router = Router();

router.post('/send/:id', verifyToken, sendMessage);
router.get('/get/:id', verifyToken, getCurrentUserMessages);
router.put('/update/:id', verifyToken, updateMessage);
router.post('/typing/:id', verifyToken, typing);

export default router;