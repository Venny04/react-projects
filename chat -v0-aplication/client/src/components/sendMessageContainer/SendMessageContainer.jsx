import AddIcon from '@mui/icons-material/Add';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MicIcon from '@mui/icons-material/Mic';

import './sendMessageContainer.css';
import { fecthAPI } from '../../assets/api/fecthAPIdata';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { SocketContext } from '../../contexts/SocketContext';

const SendMessageContainer = () => {
  const { seletedUser, userAuthToken, setUserMessages} = useContext(UserContext);
  const [message, setMessage] = useState('');
 
  const handleTyping = async (e) => {
    const target = e.currentTarget;
    const value = target?.value;
    if(!target) return;
    setMessage(value);

    const id = seletedUser?.userId;
    if(!id) return;
    const content =  await fecthAPI(`http://localhost:8080/api/v1/message/typing/${id}`, 'POST', '', userAuthToken,'');

    console.log(content);
  };

  const handleStopTyping = (e) => {
    // const id = seletedUser?.userId;
    // socket.emit('stopTyping', id);
  };
  const handlerSendeMessageSubMit = async (e) => {
    e.preventDefault();
    const id = seletedUser?.userId;
    if(!id || !message.trim()) return;

    try {
      const content = await fecthAPI(`http://localhost:8080/api/v1/message/send/${id}`, 'POST', '', userAuthToken,message.toString());
      setUserMessages(messages => [...messages, content]);
      setMessage('');
      handleStopTyping();
    } catch (error) {
      console.log(error)
    }
  }
 
  return (
    <section className='send-message-container'>
      <div className="upload-files-btn">
        <AddIcon />
      </div>
      <div className="upload-files-btn">
        <MicIcon />
      </div>
        <form className='send-message-text' onSubmit={handlerSendeMessageSubMit}>
          <input type="text" name='message' value={message} onChange={handleTyping} id='message' placeholder='Aa' onBlur={handleStopTyping} autoComplete='off'/>
          <div className="icons-btns">
              <EmojiEmotionsIcon />
          </div>
        </form>
    </section>
  )
}

export default SendMessageContainer