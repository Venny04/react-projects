import  { createContext, useState, useEffect, useContext } from 'react';
import { fetchAPIdata } from '../../assets/api/fecthSchoolAPI';

export const GlobalContext = createContext();
export const UseGlobalContext = () => useContext(GlobalContext)
export const GlobalProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(null);
  const [seletedUser, setSeletedUser] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [chatUser, setChatUser] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('bolaAuthUser');
    if (storedUser) {
      setUserAuth(JSON.parse(storedUser));
    }

    const getChatUsers = async () => {
      const token = userAuth?.token;
      try {
        if(!token) return;
        const response = await fetchAPIdata('http://localhost:8080/api/v1/professor/chat-message/users', "GET", 'bula', token);

        if(!response) return;
        setChatUser(response.users);
      } catch (error) {
        console.log(error)
      }
    }
    getChatUsers();
  }, [userAuth?._id]);

  // Função para fazer login
  const login = (userData, token) => {
    setUserAuth({ ...userData, token });
    localStorage.setItem('bolaAuthUser', JSON.stringify({ ...userData, token }));
  };

  // Função para fazer logout
  const logout = () => {
    setUserAuth(null);
    return  localStorage.removeItem('bolaAuthUser');
  };
  const values = {
    login, 
    logout,
    userAuth, 
    showChat, 
    chatUser, 
    setChatUser,
    setShowChat,
    chatMessages, 
    setChatMessages,
    seletedUser, setSeletedUser
  }

  return (
    <GlobalContext.Provider value={ values }>
      {children}
    </GlobalContext.Provider>
  );
};