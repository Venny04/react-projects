import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';

import { Link } from 'react-router-dom'
import './header.css';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const Header = ({ avatar, name, iconsList }) => {
  const { seletedUserNotificaions, userAuth } = useContext(UserContext);

  
  return (
    <header className='header-section'>
      <Stack direction="row" spacing={1.5} alignItems={'center'} style={{width:"100%"}}>
        <Avatar alt={name} src={avatar ? avatar :"/static/images/avatar/1.jpg"} className='current-user-avatar' />
        {name && (
          <div className="details">
            <h2 className='current-user-name'>{name}</h2>
            <span className='current-user-info'>{
               seletedUserNotificaions?.userId == userAuth?._id ? seletedUserNotificaions?.message : ''
            }</span>
          </div>
        )}
      </Stack>
        <nav>
          <ul>
            {
              iconsList?.map(({path, title, Icon}) => (
                <li key={path}>
                  <Link to={path && path}>
                    <Tooltip title={title}>
                      <Badge color="default" variant="dot">
                        <IconButton>
                          <Icon />
                        </IconButton>
                      </Badge>
                    </Tooltip>
                  </Link>
                </li>
              ))
            }
            {/* <li>
              <a href="#">
                <Tooltip title="Status">
                  <Badge color="secondary" variant="dot">
                    <IconButton>
                      <DataUsageIcon />
                    </IconButton>
                  </Badge>
                </Tooltip>
              </a>
            </li>
            <li>
              <a href="#">
                <Tooltip title="configuracoes">
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                </Tooltip>
              </a>
            </li> */}
          </ul>
        </nav>
    </header>
  )
}

export default Header