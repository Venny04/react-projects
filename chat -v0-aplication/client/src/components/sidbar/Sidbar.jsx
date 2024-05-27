import Header from '../header/Header';
import MenuComponent from '../menuComponent/MenuComponent';
import UsersListContainer from '../usersListContainer/UsersListContainer';
import AddCommentIcon from '@mui/icons-material/AddComment';

import { sidbarHeaderIcons } from '../../assets/listIcons';

import './sidbar.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import FindUserContainer from '../findUserContainer/FindUserContainer';

const Sidbar = () => {
  const {userAuth, setShowList, userMessages, seletedUser} = useContext(UserContext);
  const [userAvatar, setUserAvatar] = useState(null);
  const [userName, setUserName] = useState(null);
  useEffect(() => {
    if(!userAuth) return;
      setUserAvatar(userAuth?.userAvatar);
  }, [userAuth, userMessages]);
  return (
    <menu className='sidbar-section'>
      <Header avatar={userAvatar} name={userName} iconsList={sidbarHeaderIcons} />
      <MenuComponent />
      <UsersListContainer />
      <div className="sidbar-btn">
        <abbr title="Nova Mensagem" onClick={() => setShowList(true)}>
          <AddCommentIcon />
        </abbr>
      </div>
      <FindUserContainer />
    </menu>
  )
}

export default Sidbar