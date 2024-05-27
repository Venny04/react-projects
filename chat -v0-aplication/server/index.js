import { connectToddb } from "./db/connection.js";
import { app, server } from "./socket/index.js";
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors';

import authRouter from './routers/auth.js';
import messageRouter from './routers/message.js';
import chatgeRouter from './routers/chat.js';
import usergeRouter from './routers/user.js';
import audiogeRouter from './routers/audio.js';
dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/audio', audiogeRouter);
app.use('/api/v1/message', messageRouter);
app.use('/api/v1/chat', chatgeRouter);
app.use('/api/v1/user', usergeRouter);

const PORT = process.env.PORT
const url = process.env.DBURL;

const startServer = async () => {
    connectToddb(url);
    server.listen(PORT, () => console.log('server runing on port ' + PORT));

}
startServer();