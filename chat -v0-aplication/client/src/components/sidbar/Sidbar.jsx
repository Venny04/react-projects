import Header from '../header/Header';
import MenuComponent from '../menuComponent/MenuComponent';
import UsersListContainer from '../usersListContainer/UsersListContainer';
import AddCommentIcon from '@mui/icons-material/AddComment';

import { sidbarHeaderIcons } from '../../assets/listIcons';

import './sidbar.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';

const Sidbar = () => {
  const {userAuth} = useContext(UserContext);
  const [userAvatar, setUserAvatar] = useState(null);
  const [userName, setUserName] = useState(null);
  // const [userAvatar, setUserAvatar] = useState(null);
  useEffect(() => {
    if(!userAuth) return;
      setUserAvatar(userAuth?.userAvatar);
  }, [userAuth]);
  return (
    <menu className='sidbar-section'>
      <Header avatar={userAvatar} name={userName} iconsList={sidbarHeaderIcons} />
      <MenuComponent />
      <UsersListContainer />
      <div className="sidbar-btn">
        <AddCommentIcon />
      </div>
    </menu>
  )
}

export default Sidbar