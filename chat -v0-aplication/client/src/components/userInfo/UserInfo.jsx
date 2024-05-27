import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import { userInfoIcons } from '../../assets/listIcons';
import { IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import './userInfo.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';

const UserInfo = () => {
  const {seletedUser} = useContext(UserContext);
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState(null);
  useEffect(() => {
    setAvatar(seletedUser?.avatar);
    setName(seletedUser?.name);
  }, [seletedUser])
  const handleUpload = (e) => {
    
  }
  return (
    <article className='user-info-section'>
      <Stack direction="row" spacing={1.5} alignItems={'center'} flexDirection={'column'} justifyContent={'center'}>
        <Avatar alt={name} src={avatar ? avatar : "/static/images/avatar/1.jpg" }className='current-user-avatar' />
        {/* <input type="file" name="upload" id="upload" onChange={handleUpload}/> */}
        
        <div className="details">
            <h2 className='current-user-name'>{name}</h2>
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