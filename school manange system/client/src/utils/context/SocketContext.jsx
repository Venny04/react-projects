import  { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { GlobalContext } from './GlobalContext';


const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    // const [socket, setSocket] = useState(null);
    const [OnlineUsers, setOnlineUsers] = useState([]);

    const {userAuth} = useContext(GlobalContext);
    
    useEffect(() => {
      if (userAuth) {
          const sock = io('http://localhost:8080/', {
              query: {
                  userid: userAuth._id
              }
          });
          console.log(sock);
          setSocket(sock);
  
          sock.on('getuseronline', (user) => {
              setOnlineUsers(user);
              console.log(user);
          });
  
          return () => sock.close();
      }
  }, [userAuth]);

  return (
    <SocketContext.Provider value={{socket, OnlineUsers}}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };