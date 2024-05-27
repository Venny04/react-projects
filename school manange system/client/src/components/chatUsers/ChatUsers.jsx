import { Close } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import ChatUserCard from '../chatUserCard/ChatUserCard';
import './chatUsers.css';
import { GlobalContext } from '../../utils/context/GlobalContext';
import { useContext } from 'react';

const ChatUsers = () => {
    const {chatUser, setChatUser} = useContext(GlobalContext);
  return (
    <article className='Chat-users-container'>
        <header>
            <h3>Chats</h3>
            <ul>
                <li className='close-chat-btn'>
                    <Close />
                </li>
            </ul>
        </header>
        <main>
            <div className="search-input-box">
                <div className="icon-box">
                    <SearchIcon />
                </div>
                <input type="text" placeholder='perquisar' />
            </div>
            <div className="filter-section">
                <button>não lido</button>
                <button>online</button>
            </div>
            <article className='card-chat-users'>
                <ul>
                    {chatUser.map(({nomeCompleto,role,genero, _id:id}) => (
                        <ChatUserCard key={id} type={role} genero={genero} userName={nomeCompleto} userId={id} />
                    ))}
                </ul>
            </article>
        </main>
    </article>
  )
}

export default ChatUsers