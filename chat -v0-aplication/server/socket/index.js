import express from 'express';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { createServer } from 'http';


dotenv.config();

const app = express();

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
        methods: ["GET", "POST"]
    }
});


const userSocketio = {};

export const getResiveSocketid = (receveUserId) => {
    return userSocketio[receveUserId];
}

io.on('connection', (socket) => {

    const userid = socket.handshake.query.userid;
    // console.log(userid)
    if (userid) userSocketio[userid] = socket.id;
    io.emit('getuseronline', Object.keys(userSocketio));

    socket.on('typing', (id) => {
        if (!id) return;
        const userid = getResiveSocketid(id);

        io.to(userid).emit('typing');
    });

    socket.on('stopTyping', (id) => {
        if (!id) return;
        const userid = getResiveSocketid(id);
        io.to(userid).emit('stopTyping');
    });

    socket.on('disconnect', () => {
        console.log('user disconnect.');
        delete userSocketio[userid];
        io.emit('getuseronline', Object.keys(userSocketio));
    });
});

export {
    app,
    io,
    server
}