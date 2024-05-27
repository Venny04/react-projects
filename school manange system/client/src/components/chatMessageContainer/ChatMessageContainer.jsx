import { useState, useEffect, useContext, useRef } from 'react';
import { Avatar, Stack } from '@mui/material';

import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import MoodOutlinedIcon from '@mui/icons-material/MoodOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { Link } from 'react-router-dom';
import UserMessage from '../userMessage/UserMessage';
import { GlobalContext } from '../../utils/context/GlobalContext';
import { fetchAPIdata } from '../../assets/api/fecthSchoolAPI';
import { chatmessageheaderincos } from '../../assets/Icons';
import axios from "axios";
import MessageContext from '../../utils/context/MessageContext';

import './chatMessageContainer.css';
import { SocketContext } from '../../utils/context/SocketContext';

const ChatMessageContainer = () => {
  MessageContext();
  const [user, setUser] = useState(null);
  const [notMessageInfo, setNotMessageInfo] = useState('');
  const [content, setContent] = useState('');
  const { seletedUser, setSeletedUser, chatMessages, setChatMessages,  userAuth} = useContext(GlobalContext);
  const {OnlineUsers} =  useContext(SocketContext);
  const isOnline = OnlineUsers?.includes(seletedUser);
  const chatMessageRef = useRef(null);
  
  const token = userAuth?.token;

  const scrollToBottom = () => {
    if (chatMessageRef.current) {
      chatMessageRef.current.scrollTo(0, chatMessageRef.current.scrollHeight);
    }
  };
  
  useEffect(() => {

    if (!seletedUser) return;



    const getUserInfo = async () => {
      if(!token) return
      const response = await fetchAPIdata(`http://localhost:8080/api/v1/admin/${seletedUser}?entidade=professores`, "GET", "", token);
      
      if (!response) return;
      setUser(response.data);

      try {
      
        if(!seletedUser || !token) return
        let mgs = await  await fetchAPIdata(`http://localhost:8080/api/v1/message/get/${seletedUser}`, "GET", "", token);

        if(!mgs.error){
          setChatMessages(mgs?.chat?.chatMessages);
          scrollToBottom();
        } 
      } catch (error) {
        setNotMessageInfo(error.response?.data?.message);
        setChatMessages([]);
      }

    };
    scrollToBottom();
    getUserInfo();
  }, [seletedUser, user?._id, setChatMessages, token]);



  const handleSendMessage = async (e) => {
    e.preventDefault();
    if(!seletedUser || !token || !content) return;

    try {
      let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json" 
        }

        let bodyContent = JSON.stringify({
          "content": content.toString()
        });

        let reqOptions = {
          url: `http://localhost:8080/api/v1/message/send/${seletedUser}`,
          method: "POST",
          headers: headersList,
          data: bodyContent,
        }

  


        let response = await axios.request(reqOptions);
        if(!response.data) return;
        setChatMessages(messages => [...messages, response.data]);
        scrollToBottom();
        setContent('');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <article className='chat-message-container'>
      <header>
        <Stack className='stack-container' alignItems='center' direction='row' spacing={1}>
          <Avatar style={{ width: '30px', height: '30px', fontSize: '14px' }} alt='' src='/static/images/avatar/1.jpg' />
          <div className='message-container-details'>
            <h4 className='user-name' style={{ textTransform: 'capitalize' }}>
              {user?.nomeCompleto || 'user name'}
            </h4>
            <span className='user-message-info'>{isOnline && "online"}</span>
          </div>
        </Stack>
        <ul>
          {chatmessageheaderincos.map(({ Icon, name, path, fnc }) => (
            <li key={name}>
              {path ? (
                <Link to={path + `professores/porfile/${user?._id}/`}>
                  <Icon />
                </Link>
              ) : (
                <div onClick={() => (fnc === 'close' ? setSeletedUser('') : '')}>
                  <Icon />
                </div>
              )}
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </header>
      <main ref={chatMessageRef}>
        {
        chatMessages?.length >= 1 ? (
          chatMessages?.map(({ _id: id, content,receiverID }) => <UserMessage 
            key={id} 
            type={receiverID !== seletedUser ? 'left': 'right'} 
            content={content} 
          />)
        ) : (
          <div className='no-message-info'>
            <h2>Hello <span className="hand-emoji">👋</span>  {notMessageInfo}</h2>
          </div>
        )}
      </main>
      <footer>
        <ul>
          <li>
            <MicNoneOutlinedIcon />
          </li>
          <li>
            <AddPhotoAlternateOutlinedIcon />
          </li>
        </ul>
        <form className='send-message-container' onSubmit={handleSendMessage}>
          <input type='text' placeholder='Aa' value={content} onChange={(e => setContent(e.target.value))} />
          <div className='box-icon'>
            <MoodOutlinedIcon />
          </div>
        </form>
      </footer>
    </article>
  );
};

export default ChatMessageContainer;