import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

import './onlineUserCard.css';
import { fetchAPIdata } from '../../assets/api/fecthSchoolAPI';

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

const OnlineUserCard = ({userId}) => {
    const [user, setUser] = useState(null);

  useEffect(() => { 
    const getUserData  =  async () => {
      const response = await fetchAPIdata(`http://localhost:8080/api/v1/admin/${userId}?entidade=professores`, "GET", '','');
      if(!response) return
      setUser(response.data);
      console.log(response);
    }
    getUserData()
  }, [userId]);
  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
    >
      <Tooltip title={user?.nomeCompleto}>
        <Avatar alt={user?.nomeCompleto} src="/static/images/avatar/1.jpg" className='user-online-avatar' />
      </Tooltip>
    </StyledBadge>
   
  );
}

export default OnlineUserCard