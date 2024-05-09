import express from 'express';
import { uploadAudio } from '../controllers/audio.js';

const { Router } = express


const router = Router();


router.post('/upload-audio', uploadAudio);
export default router;