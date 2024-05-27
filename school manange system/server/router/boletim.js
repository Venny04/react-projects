import { getAlunoBoletim, updateAlunoBoletim } from '../controllers/boletim.js'
import { Router } from 'express';


const router = Router();

router.get('/:alunoId', getAlunoBoletim);
router.put('/:alunoId', updateAlunoBoletim);


export default router;