import express from 'express';

import { sendMessage, getMessage } from '../controllers/message.js';
import { verifyToken } from '../verifyToken.js';


const router = express.Router();

router.post('/send/:id', verifyToken, sendMessage);
router.get('/get/:id', verifyToken, getMessage);


export default router;