import { createContext, useEffect, useState } from "react";
import { fecthAPI } from "../assets/api/fecthAPIdata";


export const UserContext = createContext();


export const UserProvider = ({ children }) => {
    const [userAuth, setUserAuth] = useState(null);
    const [userAuthToken, setUserAuthToken] = useState(null);
    const [userMessages, setUserMessages] = useState([]);
    const [userChatList, setUserChatList] = useState([]);
    const [usersOnline, setUsersOnline] = useState([]);
    const [seletedUser, setSeletedUser] = useState(false);
    const [seletedUserNotificaions, setseletedUserNotificaions] = useState('');
    const [showList, setShowList] = useState(false);
    
    useEffect(() => {
        const user = localStorage.getItem('feedUser') || null;
        const token = localStorage.getItem('feedUserToken') || null;

        setUserAuth(JSON.parse(user));
        setUserAuthToken(JSON.parse(token));

        const getChatList = async () => {
            if(!user || !token) return;
           const response = await fecthAPI("http://localhost:8080/api/v1/chat/get", "GET",'', JSON.parse(token), '');

           if(!response) return;
            setUserChatList(response?.users);
        }
        getChatList();
    }, [seletedUser]);
    
    const login = (user, token) => {
        localStorage.setItem('feedUser', JSON.stringify(user));
        localStorage.setItem('feedUserToken', JSON.stringify(token));
        setUserAuth(JSON.parse(user));
        setUserAuthToken(JSON.parse(token));
    }
    
    const contextValues = {
        login,
        userAuth, setUserAuth,
        showList, setShowList,
        userMessages, setUserMessages,
        userChatList, setUserChatList,
        usersOnline,setUsersOnline,
        seletedUser, setSeletedUser,userAuthToken,
        seletedUserNotificaions, setseletedUserNotificaions
    }
    return(
        <UserContext.Provider value={contextValues}>
            { children }
        </UserContext.Provider>
    )
}
