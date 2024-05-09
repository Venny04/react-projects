import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import UserMessage from '../userMessage/UserMessage';

import './messagesContainer.css';
import { useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../contexts/UserContext';

const MessagesContainer = () => {
  const {userMessages, userAuth, seletedUser} = useContext(UserContext);
  const messagesContainer = useRef(null);

  useEffect(() => {
    if (!messagesContainer.current) return;
    
    messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight;
  }, [seletedUser,userMessages]);
  return (
    <section className='messages-container' ref={messagesContainer}>
      <ul className='list-messages'>
        {
          userMessages?.map(({ content, senderID }) => (
            <UserMessage  content={content} type={senderID == userAuth._id ?'left': 'right'}/>
          ))
        }
      </ul>
    </section>
  )
}

export default MessagesContainer