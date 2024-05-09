import { createContext, useContext, useEffect, useState } from "react"
import { UserContext } from "./UserContext";
import io from 'socket.io-client';

import  messageSoundPath from '../assets/interface-124464.mp3' ;

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [onlineUser, setOnlineUser] = useState([]);
    const { userAuth, setUsersOnline, setUserMessages, setseletedUserNotificaions } = useContext(UserContext);
    const [socket, setSocket] = useState(null);
    

    useEffect(() => {
        if(userAuth){
            const sock = io('http://localhost:8080/', {
                query: {
                    userid: userAuth?._id
                }
            });
            setSocket(sock);
            sock.on('getuseronline', (user) => {
                setUsersOnline(user);
            });
            sock.on('message', (message) => {
                const audio = new Audio(messageSoundPath);
                setUserMessages(messages => [...messages, message]);
                audio.play();
              
                return () => sock?.off('message');
            });
            const handleStopTyping = () => {
                setseletedUserNotificaions('');
            };
            sock?.on('stopTyping', handleStopTyping);


            return () =>  sock.close();
        }
    }, [userAuth]);

    const valuesContext = {
        onlineUser, setOnlineUser, socket,setSocket
    }
    return (
        <SocketContext.Provider value={valuesContext}>
            {children}
        </SocketContext.Provider>
    )
}

