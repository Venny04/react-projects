import * as dotenv from 'dotenv';
import express from 'express';
import { server, app } from './socket/index.js';
import alunoRouter from './router/aluno.js';
import professorRouter from './router/professor.js';
import adminRouter from './router/admin.js';
import boletimRouter from './router/boletim.js';
import turmaRouter from './router/turma.js';
import chatRouter from './router/chat.js';
import messageRouter from './router/message.js';
import { connectTodb } from './db/connection.js';

import cors from 'cors';
import path from 'path';
dotenv.config();



const PORT = process.env.PORT;
const URLdb = process.env.DBURL;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());



app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/professor', professorRouter);
app.use('/api/v1/aluno', alunoRouter);
app.use('/api/v1/turma', turmaRouter);
app.use('/api/v1/boletim', boletimRouter);
app.use('/api/v1/chat', chatRouter);
app.use('/api/v1/message', messageRouter);


const startServer = () => {
    server.listen(PORT, () => console.log
        ("server is runing on por: " + PORT));
    connectTodb(URLdb);
}

startServer();