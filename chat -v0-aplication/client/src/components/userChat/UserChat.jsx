
import { useContext, useEffect } from 'react';
import { chatHeaderIcons } from '../../assets/listIcons';
import MessagesContainer from '../messagesContainer/MessagesContainer';
import Header from '../header/Header';
import SendMessageContainer from '../sendMessageContainer/SendMessageContainer';

import './userChat.css';
import { fecthAPI } from '../../assets/api/fecthAPIdata';
import { UserContext } from '../../contexts/UserContext';
const UserChat = ({ userid }) => {
  const { userAuthToken, setUserMessages, seletedUser } = useContext(UserContext);
  
  

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const respose = await fecthAPI(`http://localhost:8080/api/v1/message/get/${userid}`,"GET", '', userAuthToken,'');
        if(!respose) return;
        setUserMessages(respose);
  
      } catch (error) {
        console.log(error)
      }
    }
  
    getUserInfo();
  }, [userid]);
  return (
    <article className='user-chat-section'>
      <Header name={seletedUser?.name} 
        iconsList={chatHeaderIcons} />
      <MessagesContainer />
      <SendMessageContainer />
    </article>
  )
}

export default UserChat