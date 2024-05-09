import express from 'express';
import { createAccount, login } from '../controllers/auth.js';


const { Router } = express


const router = Router();


router.post('/login', login);
router.post('/create-account', createAccount);
export default router;