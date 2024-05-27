import { useContext, useEffect } from 'react'
import { UserContext } from './UserContext';
import { SocketContext } from './SocketContext';

const MessageContext = () => {
    const { setseletedUserNotificaions, userAuth } = useContext(UserContext)
    const { socket } = useContext(SocketContext);
    useEffect(() => {
        const handleTyping = (data) => {
            setseletedUserNotificaions(data);
        };



        socket?.on('typing', handleTyping);

        return () => socket?.off('typing', handleTyping);

    }, [socket]);
}

export default MessageContext