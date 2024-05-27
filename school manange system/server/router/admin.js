import { Router } from 'express';

import { getSchoolEtatisticas, getSchoolTotalDocs, getAlunos, createAluno, createAProfessor, getTurma, getTurmasLength, getUser, getAlunoBoletim, updateAlunosInfo, deleteEntidade } from '../controllers/admin.js';
import { verifyToken } from '../verifyToken.js';

const router = Router();

// Middleware para verificar se o usuário é um administrador
// Rota do admin para gerenciamento de turmas


router.get('/turma', getTurma);
router.get('/turmas', getTurmasLength);


router.get('/get/boletim/:id', getAlunoBoletim);

router.get('/:id', getUser);
// School
router.get('/cadastrados/total', getSchoolTotalDocs);
router.get('/school/status', getSchoolEtatisticas);

// Professores
router.post('/professor/create', verifyToken, createAProfessor);



// Aluno

router.post('/aluno/create', verifyToken, createAluno);


router.put('/user/:id', verifyToken, updateAlunosInfo);



router.delete('/del/:id', verifyToken, deleteEntidade);


// router.post('/aluno/:alunoId', verifyToken, updateAlunosInfo);

router.get('/', getAlunos);

export default router;