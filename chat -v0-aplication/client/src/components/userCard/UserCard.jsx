import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import './userCard.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { fecthAPI } from '../../assets/api/fecthAPIdata';

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

const UserCard = ({ avatar, name, userId }) => {
  
  const { usersOnline, setSeletedUser, seletedUser, userAuthToken, userMessages } = useContext(UserContext);
  const isOnline = usersOnline.includes(userId);

  const [lastMessage, setLastMessage] = useState('');
  const [lastMessageTimer, setLastMessageTimer] = useState({});

  useEffect(() => {
    const getUserMessageinfo = async () => {
      try {
        const respose = await fecthAPI(`http://localhost:8080/api/v1/message/get/${userId}`,"GET", '', userAuthToken,'');
        if(!respose) return;

        const message = respose[respose.length -1] || null;
        setLastMessage(message);
        setLastMessageTimer({
          hours: new Date(message?.createdAt).getHours(),
          minute: new Date(message?.createdAt).getMinutes()
        });
      } catch (error) {
        console.log(error)
      }
    }
    getUserMessageinfo();
  }, [userId, userMessages]);
  return (
    <li className={`user-card ${seletedUser?.userId == userId ? 'active': ''}`} onClick={() => setSeletedUser({userId, name, avatar})}>
        <Stack direction="row" spacing={2}>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant={isOnline && "dot"}
            >
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className='current-user-avatar' />
            </StyledBadge>
          </Stack>
        <div className='user-details'>
          <div>
            <h2 className='user-name'>{name}</h2>
            <span className='last-message-timer'>{lastMessageTimer?.hours ?lastMessageTimer?.hours + ':'+lastMessageTimer?.minute : ''}</span>
          </div>
          <div>
            <span className="last-message">
              {lastMessage ? lastMessage?.receiverID == userId ?(
              <span>voce: {lastMessage?.content}</span>)
              :<span>{name?.split(' ')[0]}: {lastMessage?.content}</span>: 'sem messagem'}
            </span>
         
            {/* {lastMessage?.isRead == true && lastMessage?.receiverID == userId  ? (<DoneAllIcon />): ''}
            */}
          </div>
        </div>
    </li>
  )
}

export default UserCard