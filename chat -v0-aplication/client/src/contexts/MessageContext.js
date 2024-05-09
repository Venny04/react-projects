import { useContext, useEffect } from 'react'
import { UserContext } from './UserContext';
import { SocketContext } from './SocketContext';

const MessageContext = () => {
    const { setseletedUserNotificaions } = useContext(UserContext)
    const { socket } = useContext(SocketContext);
    useEffect(() => {
        const handleTyping = (data) => {
            console.log('digitando')
            setseletedUserNotificaions('digitando');
        };



        socket?.on('typing', handleTyping);

        return () => socket?.off('typing', handleTyping);

    }, [socket]);
}

export default MessageContext