import { useContext, useEffect } from 'react'
import { GlobalContext } from './GlobalContext';
import { SocketContext } from './SocketContext';
import messageSound from '../../assets/message-notification-190034.mp3';
const MessageContext = () => {
    const { setChatMessages } = useContext(GlobalContext);
    const { socket } = useContext(SocketContext);
    useEffect(() => {
        socket?.on('message', (message) => {
            const audio = new Audio(messageSound);
            audio.play();
            setChatMessages(msgs => [...msgs, message]);
        });
        return () => socket?.off('message');
    }, [socket?._id]);
}

export default MessageContext