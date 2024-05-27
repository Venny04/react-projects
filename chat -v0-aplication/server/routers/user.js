import express from 'express';
import { findUser } from '../controllers/user.js';


const { Router } = express


const router = Router();

router.get('/find', findUser);

export default router