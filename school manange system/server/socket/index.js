import express from 'express';
import { Server } from 'socket.io'
import { createServer } from 'http';
import * as dotenv from 'dotenv';
dotenv.config();


const app = express();

const server = createServer(app);

const userSocketio = {};

export const getResiveSocketid = (receveUserId) => {
    return userSocketio[receveUserId];
}

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});


io.on('connection', socket => {
    const userid = socket.handshake.query.userid;
    if (userid) userSocketio[userid] = socket.id.toString();
    io.emit('getuseronline', Object.keys(userSocketio));
    console.log('conneted', socket.id)

    socket.on('disconnect', () => {
        console.log('user disconnect.');
        delete userSocketio[userid];
        io.emit('getuseronline', Object.keys(userSocketio));
    });
});


export { app, server, io }