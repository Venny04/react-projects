import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import { userInfoIcons } from '../../assets/listIcons';
import { IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

import './userInfo.css';

const UserInfo = () => {
  return (
    <article className='user-info-section'>
      <Stack direction="row" spacing={1.5} alignItems={'center'} flexDirection={'column'} justifyContent={'center'}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className='current-user-avatar' />
        <div className="details">
            <h2 className='current-user-name'>Mor</h2>
            <nav>
              <ul>
                {
                  userInfoIcons.map(({Icon, title}) => (
                    <li>
                      <Link>
                        <Tooltip title={title}>
                              <IconButton>
                                <Icon />
                              </IconButton>
                        </Tooltip>
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </nav>
        </div>
      </Stack>
    </article>
  )

}

export default UserInfo