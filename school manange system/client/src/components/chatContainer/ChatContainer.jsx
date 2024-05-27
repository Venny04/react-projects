import { ArrowBack, ArrowDropUp } from '@mui/icons-material';
import { GlobalContext } from '../../utils/context/GlobalContext';
import ChatMessageContainer from '../chatMessageContainer/ChatMessageContainer';
import ChatUsers from '../chatUsers/ChatUsers';
import './chatContainer.css';
import { useContext } from 'react';

const ChatContainer = () => {
  const {showChat, setShowChat, seletedUser} = useContext(GlobalContext);
  return (
    <section className={`chat-container ${showChat !== true && 'hidden'}`}>
      <aside className='chat-container-btn' onClick={() => setShowChat(true)}>
        <ArrowDropUp />
      </aside>
      <ChatUsers />
      {
        seletedUser && (
          <ChatMessageContainer />
        )
      }
    </section>
  )
}

export default ChatContainer