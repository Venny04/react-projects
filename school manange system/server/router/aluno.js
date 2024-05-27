import { Router } from 'express';
import { getAluno, getAlunoForSearch } from '../controllers/aluno.js';

const router = Router();


router.get('/:id', getAluno);
router.get('/get/search', getAlunoForSearch);
export default router;