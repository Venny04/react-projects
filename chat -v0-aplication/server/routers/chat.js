import express from 'express';
import { getUserChat } from '../controllers/chat.js';
import { verifyToken } from '../verifyToken.js';


const { Router } = express


const router = Router();
router.get('/get', verifyToken, getUserChat);

export default router;