import Avatar from '@mui/material/Avatar';

import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

import './chatUserCard.css';
import { useContext } from 'react';
import { GlobalContext } from '../../utils/context/GlobalContext';
import { SocketContext } from '../../utils/context/SocketContext';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const ChatUserCard = ({userName,type,genero, userId}) => {
  const {setSeletedUser, seletedUser} = useContext(GlobalContext);
  const {OnlineUsers} = useContext(SocketContext);
  const isOnline = OnlineUsers?.includes(userId);
  // useEffect(() => {
  //   console.log(seletedUser);
  // }, [userId]);
  return (
    <li className={`chat-user-card ${seletedUser?.toString() == userId?.toString() && 'seleted'}`} onClick={() => setSeletedUser(userId)}>
      <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant={isOnline && "dot"}
    >
        <Avatar style={{width:'37px', height: '37px'}} alt={ ''} src="/static/images/avatar/3.jpg" />
    </StyledBadge>
        <aside className='chat-user-card-detais'>
            <h4 className='user-name'>{userName || 'user name'}</h4>
            <span className='user-message' style={{textTransform:"capitalize"}}>
            {type === 'professor' && genero?.toLowerCase() === 'm' ? 'Professor' : type === 'professor' && genero?.toLowerCase() === 'f' ? 'Professora' : type}
              {/* <span className='not-read-message'></span> */}
            </span>
        </aside>
    </li>
  )
}

export default ChatUserCard